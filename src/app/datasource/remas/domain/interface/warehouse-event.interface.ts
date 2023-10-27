import { WarehouseInterface } from './warehouse.interface';

import { EventInterface } from './event.interface';

import { PaginationInterface } from './pagination.interface';
export interface WarehouseEventInterface{
	uuid: string;

	eventUuid: string;

	warehouseUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	warehouse: WarehouseInterface;

	event: EventInterface;

	pagination: PaginationInterface;
}