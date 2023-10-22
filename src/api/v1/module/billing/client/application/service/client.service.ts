import { Inject, Injectable } from "@nestjs/common";
import { Company, Tribute } from "src/api/v1/datasource/remas/shared/domain/model/identity";
import { Client } from "src/api/v1/datasource/remas/shared/domain/model/billing";
import { ClientHelper } from "../helper";
import { StructureHelper } from "shared/structure/application/helper/structure.helper";
import { Includeable, Op } from "sequelize";
import { ClientDto } from "src/api/v1/datasource/remas/shared/domain/dto/billing/client.dto";

@Injectable()
export class ClientService {
    constructor(
        @Inject('ClientRepository')
        private clientService: typeof Client,

        private clientHelper: ClientHelper,
    ) { }

    // async create({ name, tributeCode }: { name: string; tributeCode: string; }) {
    //     await this.clientHelper.tributeCodeExists({ tributeCode });

    //     return await this.tributeService.create({
    //         companies: [{ name }],
    //         clients: [{ condition: true }],
    //         ...{ code: tributeCode },
    //     }, {
    //         include: [
    //             { model: Company },
    //             { model: Client },
    //         ]
    //     });
    // }

    findAll(data?: Partial<ClientDto>) {
        data = JSON.parse(JSON.stringify(data));
        const pagination = StructureHelper.searchProperty(data, 'pagination', true)[0];
        const tribute = StructureHelper.searchProperty(data, 'tribute', true)[0];

        const include: Includeable | Includeable[] = [];
        if (tribute) {
            const companies = StructureHelper.searchProperty(tribute, 'companies', true)[0];
            const index = include.push({
                model: Tribute,
                where: tribute,
                required: true,
            }) - 1;
            if (companies![0]?.name) Object.assign(companies[0], { name: { [Op.like]: `%${companies[0].name}%` } });
            
            if (companies && companies[0]) include[index]['include'] = [{
                model: Company,
                where: companies[0],
                required: true,
            }]
        }
        
        return this.clientService.findAll({
            // where: data,
            include: include,
            ...pagination,
        })
    }
}