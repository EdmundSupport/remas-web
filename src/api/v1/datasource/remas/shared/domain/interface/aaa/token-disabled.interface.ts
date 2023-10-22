import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface TokenDisabledInterface{
	uuid: string;

	token: string;

	createdAt: Date;

	updatedAt: Date;

	pagination: PaginationInterface;
}