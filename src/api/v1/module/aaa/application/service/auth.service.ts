import { Inject } from "@nestjs/common";
import { Permission, Role, Session, SessionType, User, UserPerson } from "src/api/v1/datasource";
import { LogInInterface, SignInInterface } from "../../domain";
import { AuthHelper } from "../helper";
import { hashSync, compareSync } from 'bcrypt';
import { ConfigService } from "@nestjs/config";
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from "@nestjs/jwt";
import { Op, Optional } from "sequelize";
import { StructureHashTable } from "shared/structure/application/hash/structure.hash_table";
import { FilterResponseHelper } from "shared/filter_response/application/helper/filter_response.helper";
import { Person } from "src/api/v1/datasource/remas/shared/domain/model/identity";
import { NullishPropertiesOf } from "sequelize/types/utils";

export class AuthService {
    constructor(
        @Inject('UserRepository')
        private userService: typeof User,
        @Inject('PersonRepository')
        private personService: typeof Person,
        private authHelper: AuthHelper,
        private jwtService: JwtService,
        private configService: ConfigService,
        @Inject(REQUEST)
        private request: Request,
        @Inject('SessionRepository')
        private sessionService: typeof Session,
        @Inject('SessionTypeRepository')
        private sessionTypeService: typeof SessionType,
        @Inject('TOKEN_DISABLED')
        private tokenDisabledHashTable: StructureHashTable,
        @Inject('RoleRepository')
        private roleService: typeof Role,
    ) { }

    async signIn(data: SignInInterface) {
        const user: Partial<User> = {};
        const person: Partial<Person> = {
            nameFirst: data.nameFirst,
            nameSecond: data.nameSecond,
            nameOther: data.nameOther,
            surnameFirst: data.surnameFirst,
            surnameSecond: data.surnameSecond,
            surnameOther: data.surnameOther,
        };

        const userName = this.authHelper.userNameBuild(data);
        await this.authHelper.userNameExists({ userName });
        const role = await this.roleService.findOne({ where: { keyName: 'public' } });
        if (!role) throw FilterResponseHelper.httpException('AMBIGUOUS', `No existe el rol publico, por favor, contacta al administrador.`);

        const hash = this.configService.get('HASH');
        user.name = userName;
        user.password = await hashSync(data.password, hash);
        user.roleUuid = role.uuid;
        const personNew = await this.personService.create(person);
        const userPersons: Partial<UserPerson>[] = [
            { personUuid: personNew.uuid }
        ];
        const userNew = await this.userService.create({ ...user, userPersons: userPersons }, { include: [{ model: UserPerson }] });

        delete userNew.dataValues.password;
        return userNew;
    }

    async logIn({ userName, userPassword }: LogInInterface) {
        const user = await this.userService.findOne({
            where: {
                name: userName,
            }
        });

        if (!user) throw FilterResponseHelper.httpException('UNAUTHORIZED', `Usuario o contraseña incorrecto.`);
        const compare = await compareSync(userPassword, user.password);
        if (!compare) throw FilterResponseHelper.httpException('UNAUTHORIZED', 'Usuario o contraseña incorrecto.');
        const origin = this.request?.headers?.origin;
        const sessionTypes = await this.sessionTypeService.findOne({
            where: {
                keyName: 'public'
            }
        });

        const role = await this.roleService.findOne({
            where: { uuid: user.roleUuid },
            include: [
                { model: Permission }
            ]
        });

        if (!sessionTypes) throw FilterResponseHelper.httpException('BAD_REQUEST', 'No se pudo iniciar sesion, porque el navegador o dispositivo no es admitido.');
        const sessionUuid = crypto.randomUUID();
        const tokenAccessConfig = this.authHelper.configFormat(this.configService.get<string>('TOKEN_ACCESS_CONFIG'));
        const tokenRefreshConfig = this.authHelper.configFormat(this.configService.get<string>('TOKEN_REFRESH_CONFIG'));
        const tokenAccess = await this.jwtService.signAsync({ role, sessionUuid }, tokenAccessConfig);
        const tokenRefresh = await this.jwtService.signAsync({ role, sessionUuid }, tokenRefreshConfig);

        const session = await this.sessionService.create({
            uuid: sessionUuid,
            userUuid: user.uuid,
            sessionTypeUuid: sessionTypes.uuid,
            token: tokenRefresh,
        });

        await this.sessionCleanExpires();

        return {
            tokenAccess,
            tokenRefresh,
        }
    }

    async sessionCleanExpires() {
        const tokenRefreshConfig = this.authHelper.configFormat(this.configService.get<string>('TOKEN_REFRESH_CONFIG'));
        const expiresMs = this.authHelper.expiresToMs(tokenRefreshConfig.expiresIn);
        const expiresDate = new Date(new Date().getTime() - expiresMs).toISOString();

        await this.sessionService.destroy({
            where: {
                updatedAt: { [Op.lte]: expiresDate }
            }
        });
    }

    async refresh(tokenRefresh: string) {
        const [type, token] = tokenRefresh?.split(' ') ?? [undefined, undefined];
        if (!token) throw FilterResponseHelper.httpException('BAD_REQUEST', 'No se detecto ningun token.');
        if (!type) throw FilterResponseHelper.httpException('BAD_REQUEST', 'No se actualizo el token, porque no se detecto el tipo de token.');
        const tokenRefreshConfig = this.authHelper.configFormat(this.configService.get<string>('TOKEN_REFRESH_CONFIG'));
        const data = this.jwtService.decode(token);
        const sessionUuid = data['sessionUuid'];

        const session = await this.sessionService.findOne({ where: { uuid: sessionUuid } });
        if (!session) throw FilterResponseHelper.httpException('BAD_REQUEST', 'No se actualizo el token, porque la sesion que intentas actualizar es invalida.');
        const origin = this.request?.headers?.origin;
        const sessionTypes = await this.sessionTypeService.findOne({
            where: {
                keyName: 'public'
            }
        });

        if (!sessionTypes) throw FilterResponseHelper.httpException('BAD_REQUEST', 'No se actualizo el token, porque el navegador o dispositivo no es admitido.');
        const updatedAt = session.updatedAt;
        const expiresMs = this.authHelper.expiresToMs(tokenRefreshConfig.expiresIn);
        const diffMs = Math.abs(new Date().getTime() - updatedAt.getTime());
        if (diffMs > expiresMs) throw FilterResponseHelper.httpException('UNAUTHORIZED', 'No se actualizo el token, porque ya vencio, vuelva a iniciar sesion.');
        const updateSession = await this.sessionService
            .update({ updatedAt: new Date() }, { where: { uuid: sessionUuid } });

        const role = await this.roleService.findAll({
            include: [
                { model: Permission }
            ]
        });

        const tokenAccess = await this.jwtService.signAsync({ role, sessionUuid }, tokenRefreshConfig);
        return { tokenAccess };
    }

    async tokenLogOut(token: string, clean: boolean = false) {
        const data = this.jwtService.decode(token);
        const sessionUuid = data['sessionUuid'];
        const tokenRefreshConfig = this.authHelper.configFormat(this.configService.get<string>('TOKEN_REFRESH_CONFIG'));
        const timeMs = this.authHelper.expiresToMs(tokenRefreshConfig.expiresIn);
        this.tokenDisabledHashTable.set(token, new Date().getTime() + timeMs);
        clean && await this.sessionCleanExpires();
        return null;
    }

    async tokensLogOut(tokens: string[]) {
        for (const token of tokens) {
            await this.tokenLogOut(token);
        }
        return null;
    }
}