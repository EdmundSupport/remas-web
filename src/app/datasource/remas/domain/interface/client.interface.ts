import { TributeInterface } from "src/app/datasource/remas/domain/interface/tribute.interface";
import { PaginationInterface } from "./pagination.interface";

export interface ClientInterface {
    uuid: string;
    tributeUuid: string;
    condition: boolean;
    createdAt: Date;
    updatedAt: Date;
    tributes: TributeInterface;
    pagination: PaginationInterface;
}