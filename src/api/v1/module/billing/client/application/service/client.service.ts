import { Inject, Injectable } from "@nestjs/common";
import { Company, Tribute } from "src/api/v1/datasource/remas/shared/domain/model/identity";
import { Tribute as GuatemalaTribute } from "src/api/v1/datasource/remas/shared/domain/model/guatemala";
import { Client } from "src/api/v1/datasource/remas/shared/domain/model/billing";
import { ClientHelper } from "../helper";

@Injectable()
export class ClientService {
    constructor(
        @Inject('COMPANY_REPOSITORY')
        private companyService: typeof Company,
        @Inject('TRIBUTE_REPOSITORY')
        private tributeService: typeof Tribute,
        @Inject('TRIBUTE_REPOSITORY')
        private guatemalaTributeService: typeof GuatemalaTribute,
        @Inject('CLIENT_REPOSITORY')
        private clientService: typeof Client,

        private clientHelper: ClientHelper,
    ) { }

    async create({ name, tributeCode }: { name: string; tributeCode: string; }) {
        await this.clientHelper.tributeCodeExists({ tributeCode });

        return await this.tributeService.create({
            companies: [{ name }],
            clients: [{ condition: true }],
            ...{ code: tributeCode },
        }, {
            include: [
                { model: Company },
                { model: Client },
            ]
        });
    }
}