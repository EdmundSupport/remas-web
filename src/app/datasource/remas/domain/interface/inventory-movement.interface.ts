import { QuotationDetailInterface } from './quotation-detail.interface';

import { PaginationInterface } from './pagination.interface';
export interface InventoryMovementInterface{
	uuid: string;

	amount: string;

	date: Date;

	warehouseOriginUuid: string;

	originUuid: string;

	warehouseDetinyUuid: string;

	destinyUuid: string;

	productUuid: string;

	measureUnitUuid: string;

	referenceSchema: string;

	referenceTable: string;

	referenceUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	quotationDetail: QuotationDetailInterface;

	pagination: PaginationInterface;
}