import { Inject } from "@nestjs/common";
import { TokenConfigInterface, UserInterface, VerifyUserExistsInterface } from "../../domain";
import { User } from "src/api/v1/datasource";
import ms from 'ms';
import { FilterResponseHelper } from "shared/filter_response/application/helper/filter_response.helper";

export class AuthHelper {
    constructor(
        @Inject('USER_REPOSITORY')
        private userService: typeof User,
    ) { }

    async userExists({ userName, users }: VerifyUserExistsInterface) {
        let user: UserInterface | undefined;
        if (!users) user = await this.userService.findOne({ where: { name: userName } });
        if (users) user = users.find((user) => user.name == userName);

        if (user) throw FilterResponseHelper.httpException('BAD_REQUEST', `El usuario ${user.name} ya existe.`);
        return user;
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