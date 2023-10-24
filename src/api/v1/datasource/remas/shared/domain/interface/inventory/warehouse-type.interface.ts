import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface WarehouseTypeInterface{
	uuid: string;

	key: string;

	name: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	pagination: PaginationInterface;
}