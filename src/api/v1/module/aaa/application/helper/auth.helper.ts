import { Inject } from "@nestjs/common";
import { SignInInterface, TokenConfigInterface, UserNameExistsInterface } from "../../domain";
import { User } from "src/api/v1/datasource";
import ms from 'ms';
import { FilterResponseHelper } from "shared/filter_response/application/helper/filter_response.helper";

export class AuthHelper {
    constructor(
        @Inject('USER_REPOSITORY')
        private userService: typeof User,
    ) { }

    async userNameCount(name: string) {
        return await this.userService.count({ where: { name } });
    }

    userNameBuild(data: Omit<SignInInterface, 'password'>) {
        if (!(data.nameFirst && data.nameFirst != ''))
            throw FilterResponseHelper.httpException('BAD_REQUEST', 'No se ingreso el primer nombre o esta esta vacio.');

        if (!(data.surnameFirst && data.surnameFirst != ''))
            throw FilterResponseHelper.httpException('BAD_REQUEST', 'No se ingreso el primer apellido o esta esta vacio.');

        const nameFirstOneLetter = data.nameFirst[0];
        const surnameFirstOneLetter = data.surnameFirst[0];
        const date = new Date();
        const timeMs = `${date.getTime()}`;
        const timeMsLastFourNum = timeMs.substring(timeMs.length - 4);

        return (nameFirstOneLetter + surnameFirstOneLetter + timeMsLastFourNum).toUpperCase();
    }

    async userNameExists({ userName, source = this.userService.findAll({ where: { name: userName } }) }: UserNameExistsInterface) {
        const users = source instanceof Promise ? await source : source.filter((user) => user.name == userName);
        if (users?.length > 0)
            throw FilterResponseHelper.httpException('BAD_REQUEST', `El nombre de usuario ${userName} ya existe.`);

        return false;
    }


    expiresToMs(expires: string) {
        const timeTemporality = /([0-9]+)(ms|s|m|h|d)/.exec(expires);
        if (timeTemporality[2] == 'ms') return Number(timeTemporality[1]);
        if (timeTemporality[2] == 's') return Number(timeTemporality[1]) * 1000;
        if (timeTemporality[2] == 'm') return Number(timeTemporality[1]) * 1000 * 60;
        if (timeTemporality[2] == 'h') return Number(timeTemporality[1]) * 1000 * 60 * 60;
        if (timeTemporality[2] == 'd') return Number(timeTemporality[1]) * 1000 * 60 * 60 * 24;
        return 0;
    }

    configFormat(config: string | TokenConfigInterface) {
        if (typeof config == 'string') config = JSON.parse(config) as TokenConfigInterface;
        return { expiresIn: config.expiresIn, secret: String(config.secret) }
    }
}