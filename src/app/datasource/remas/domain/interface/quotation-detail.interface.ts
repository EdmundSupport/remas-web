import { QuotationInterface } from './quotation.interface';

import { InventoryMovementInterface } from './inventory-movement.interface';

import { PaginationInterface } from './pagination.interface';
export interface QuotationDetailInterface{
	uuid: string;

	amount: string;

	description: string;

	price: string;

	quotationUuid: string;

	productUuid: string;

	measureUnitUuid: string;

	priceCategoryUuid: string;

	inventoryMovementUuid: string;

	parentUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	quotation: QuotationInterface;

	inventoryMovement: InventoryMovementInterface;

	pagination: PaginationInterface;
}