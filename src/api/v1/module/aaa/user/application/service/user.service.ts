import { Injectable, Inject } from "@nestjs/common";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { User } from "src/api/v1/datasource/remas/shared/domain/model/aaa/user";
import { Op } from "sequelize";
import { UserDto } from "src/api/v1/datasource/remas/shared/domain/dto/user.dto";
import { CreateUserDto } from "../../domain/dto/create-user.dto";
import { Role } from "src/api/v1/datasource";
import { ConfigService } from "@nestjs/config";
import { hashSync, compareSync } from 'bcrypt';


@Injectable()
export class UserService {
    constructor(
        private configService: ConfigService,

        @Inject('USER_REPOSITORY')
        private userService: typeof User,

        @Inject('ROLE_REPOSITORY')
        private roleService: typeof Role,
    ) { }

    async create(data: CreateUserDto) {
        const role = await this.roleService.findOne({ where: { keyName: 'public' } });
        data.roleUuid = role.uuid;
        const user = (await this.userService.create(data as any)).dataValues;
        delete user['password'];
        return user;
    }

    findAll(data?: Partial<UserDto>) {
        data = JSON.parse(JSON.stringify(data));
        const pagination = StructureHelper.searchProperty(data, 'pagination', true)[0];
        if (data?.name) Object.assign(data, { name: { [Op.like]: `%${data.name}%` } });

        const include = [];

        return this.userService.findAll({
            attributes: ['uuid', 'name', 'condition', 'roleUuid'],
            where: data,
            include: include,
            ...pagination,
        })
    }

    findOne(uuid: string) {
        if (uuid == 'new') return undefined;
        return this.userService.findOne({
            attributes: ['uuid', 'name', 'condition', 'roleUuid'],
            where: { uuid }
        })
    }

    async update(uuid: string, data?: Partial<UserDto>) {
        if (data.password && data.password != '') {
            const hash = this.configService.get('HASH');
            data.password = await hashSync(data.password, hash);
        }
        return this.userService.update(data, { where: { uuid } });
    }
}