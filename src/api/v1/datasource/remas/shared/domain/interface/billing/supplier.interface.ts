import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface SupplierInterface{
	uuid: string;

	tributeUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	pagination: PaginationInterface;
}