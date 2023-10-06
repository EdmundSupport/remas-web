import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested, IsDate } from "class-validator";

export class CreateDto{
    @IsNumber()
    number: number; 
    
    @IsDate()
    date: Date; 

    @IsString()
    clientUuid: string; 

    @ValidateNested({each: true})
    @Type(()=>CreateDetailDto)
    @IsArray()
    quotationDetails: CreateDetailDto[]
}

export class CreateDetailDto{
    @IsNumber()
    amount: number;

    @IsString()
    description: string;
    
    @IsNumber()
    price: number;

    @IsString()
    productUuid: string;

    @IsString()
    measureUnitUuid: string;

    @IsString()
    priceCategoryUuid: string;
}