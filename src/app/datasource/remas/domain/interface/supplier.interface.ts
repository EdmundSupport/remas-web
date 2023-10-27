import { PaginationInterface } from './pagination.interface';
export interface SupplierInterface{
	uuid: string;

	tributeUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	pagination: PaginationInterface;
}