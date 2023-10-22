import { Inject } from "@nestjs/common";
import { FilterResponseHelper } from "shared/filter_response";
import { Tribute } from "src/api/v1/datasource/remas/shared/domain/model/identity";

export class ClientHelper {
    constructor(
        @Inject('TributeRepository')
        private tributeService: typeof Tribute,
    ) { }

    async tributeCodeExists({
        tributeCode,
        source = this.tributeService.findAll({ where: { code: tributeCode } })
    }: { tributeCode: string; source?: Tribute[] | Promise<Tribute[]> }) {
        const tributes = source instanceof Promise ? await source : source.filter((tribute) => tribute.code == tributeCode);
        if (tributes?.length > 0)
            throw FilterResponseHelper.httpException('BAD_REQUEST', `El numero de NIT ${tributeCode} ya existe.`);

        return false;
    }
}