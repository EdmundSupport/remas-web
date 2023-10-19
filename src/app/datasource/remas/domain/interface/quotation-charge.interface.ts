import { QuotationInterface } from './quotation.interface';

export interface QuotationChargeInterface{
	uuid: string;

	quotationUuid: string;

	chargeUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	quotation: QuotationInterface;

}