import { Inject, Injectable } from "@nestjs/common";
import { Company, Tribute } from "src/api/v1/datasource/remas/shared/domain/model/identity";
import { Tribute as GuatemalaTribute } from "src/api/v1/datasource/remas/shared/domain/model/guatemala";
import { Client } from "src/api/v1/datasource/remas/shared/domain/model/billing";
import { ClientHelper } from "../helper";
import { FindInterface } from "../../domain/interface/client.interface";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { Op } from "sequelize";

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

    findAll(data: FindInterface) {
        const pagination = StructureHelper.searchProperty(data, 'pagination', true)[0];
        const companies = StructureHelper.searchProperty(data, 'companies', true)[0];
        if (companies?.name) companies.name = { [Op.like]: `%${companies.name}%` };
        const tribute = StructureHelper.searchProperty(data, 'tributes', true)[0];
        data = JSON.parse(JSON.stringify(data));
        return this.clientService.findAll({
            where: { ...data },
            include: [{
                model: Tribute,
                where: tribute?.length == 0 ? undefined : tribute,
                include: [{
                    model: Company,
                    where: companies?.length == 0 ? undefined : companies
                }]
            }],
            ...pagination,
        })
    }
}