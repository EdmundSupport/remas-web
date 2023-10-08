import { CompanyTribute } from "./companies.interface";

export interface TributeInterface {
    uuid: string;
    code: string;
    countryUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    companies: CompanyTribute[];
}