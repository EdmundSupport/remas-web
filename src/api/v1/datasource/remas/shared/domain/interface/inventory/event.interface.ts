import { WarehouseInterface } from './warehouse.interface';

import { WarehouseEventInterface } from './warehouse-event.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface EventInterface{
	uuid: string;

	dateStart: Date;

	dateEnd: Date;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	warehouses: WarehouseInterface[];

	warehouseEvents: WarehouseEventInterface[];

	pagination: PaginationInterface;
}