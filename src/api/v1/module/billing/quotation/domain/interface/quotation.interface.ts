export class CreateInterface{
    number: number; 
    date: Date; 
    clientUuid: string; 
    quotationDetails: CreateDetailInterface[]
}

export class CreateDetailInterface{
    amount: number;
    description: string;
    price: number;
    productUuid: string;
    measureUnitUuid: string;
    priceCategoryUuid: string;
}