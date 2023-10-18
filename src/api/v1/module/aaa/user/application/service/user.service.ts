import { Injectable, Inject } from "@nestjs/common";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { User } from "src/api/v1/datasource/remas/shared/domain/model/aaa/user";
import { Op } from "sequelize";
import { UserDto } from "src/api/v1/datasource/remas/shared/domain/dto/user.dto";


@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userService: typeof User,
    ) { }

    findAll(data?: Partial<UserDto>) {
        data = JSON.parse(JSON.stringify(data));
        const pagination = StructureHelper.searchProperty(data, 'pagination', true)[0];
        if (data?.name) Object.assign(data, { name: { [Op.like]: `%${data.name}%` } });

        const include = [];

        return this.userService.findAll({
            attributes: ['name', 'condition', 'roleUuid'],
            where: data,
            include: include,
            ...pagination,
        })
    }
}