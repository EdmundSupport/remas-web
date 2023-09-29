import { Inject, Injectable } from "@nestjs/common";
import { FindOptions, Optional } from "sequelize";
import { NullishPropertiesOf } from "sequelize/types/utils";
import { FilterResponseHelper } from "shared/filter_response/application/helper/filter_response.helper";
import { Session, SessionAttributes } from "src/datasource";

@Injectable()
export class ExpirenmentService {
    constructor(
        @Inject('SESSION_REPOSITORY')
        private sessionService: typeof Session,
    ) { }

    async create(data: Optional<SessionAttributes, NullishPropertiesOf<SessionAttributes>>) {
        return this.sessionService.create(data);
    }

    async find(filter: FindOptions<SessionAttributes>) {
        return this.sessionService.findAll(filter);
    }

    async findOne(uuid: string) {
        return this.sessionService.findOne({ where: { uuid } });
    }

    async update(data: Optional<SessionAttributes, NullishPropertiesOf<SessionAttributes>>, uuid: string) {
        return this.sessionService.update(data, { where: { uuid } });
    }

    async delete(uuid: string) {
        return this.sessionService.destroy({ where: { uuid } });
    }
}