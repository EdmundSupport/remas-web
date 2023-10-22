import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface BinnacleInterface{
	uuid: string;

	schemaName: string;

	tableName: string;

	tableUuid: string;

	operationType: string;

	userName: string;

	data: object;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	pagination: PaginationInterface;
}