import { QuotationInterface } from './quotation.interface';

import { InventoryMovementInterface } from './../inventory/inventory-movement.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
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

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	quotation: QuotationInterface;

	inventoryMovement: InventoryMovementInterface;

	pagination: PaginationInterface;
}