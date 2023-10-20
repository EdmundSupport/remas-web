import { IsBoolean, IsDate, IsObject, IsOptional, IsString } from "class-validator";
import { QuotationDto } from "./quotation.dto";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";
import { InventoryMovementDto } from "./inventory-movement.dto";

export class QuotationDetailDto{
    
    @IsOptional()
    @IsString()
    uuid: string;
    
    @IsOptional()
    @IsString()
    amount: string;
    
    @IsOptional()
    @IsString()
    description: string;
    
    @IsOptional()
    @IsString()
    price: string;
    
    @IsOptional()
    @IsString()
    quotationUuid: string;
    
    @IsOptional()
    @IsString()
    productUuid: string;
    
    @IsOptional()
    @IsString()
    measureUnitUuid: string;
    
    @IsOptional()
    @IsString()
    priceCategoryUuid: string;

    @IsOptional()
    @IsString()
    inventoryMovementUuid: string;
    
    @IsOptional()
    @IsBoolean()
    condition: boolean;
    
    @IsOptional()
    @IsDate()
    createdAt: Date;
    
    @IsOptional()
    @IsDate()
    updatedAt: Date;
    
    @IsOptional()
    @IsObject()
    quotation: QuotationDto;

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;

    @IsOptional()
	@IsObject()
	inventoryMovement: InventoryMovementDto;
}