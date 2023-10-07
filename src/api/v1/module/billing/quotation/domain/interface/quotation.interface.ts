import { Quotation } from "src/api/v1/datasource/remas/shared/domain/model/billing";
import { WhereOptions } from "sequelize";

export class CreateInterface {
    number: number;
    date: Date;
    clientUuid: string;
    quotationDetails: CreateDetailInterface[]
}

export class CreateDetailInterface {
    amount: number;
    description: string;
    price: number;
    productUuid: string;
    measureUnitUuid: string;
    priceCategoryUuid: string;
}

export class PaginationInterface {
    limit?: number;
    offset?: number;
}

export class FindInterface extends PaginationInterface { };