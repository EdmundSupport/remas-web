import { PaginationInterface } from './pagination.interface';
export interface TokenDisabledInterface{
	uuid: string;

	token: string;

	createdAt: Date;

	updatedAt: Date;

	pagination: PaginationInterface;
}