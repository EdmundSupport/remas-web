import { OmitType, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsArray, IsString, IsDate, ValidateNested } from "class-validator";
import { Uuid } from "shared/validation/infrastructure/decoration/uuid.decoration";
import { QuotationDetailDto } from "src/api/v1/datasource/remas/shared/domain/dto/billing/quotation-detail.dto";
import { QuotationDto } from "src/api/v1/datasource/remas/shared/domain/dto/billing/quotation.dto";

export class CreateQuotationDetailDto extends PartialType(OmitType(QuotationDetailDto, ['description', 'amount', 'price', 'productUuid', 'measureUnitUuid', 'priceCategoryUuid'])) {  
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    amount: string;

    @IsNotEmpty()
    @IsString()
    price: string;

    @IsNotEmpty()
    @IsString()
    productUuid: string;

    @IsNotEmpty()
    @IsString()
    measureUnitUuid: string;

    @IsNotEmpty()
    @IsString()
    priceCategoryUuid: string;
}
export class CreateQuotationDto extends PartialType(OmitType(QuotationDto, ['uuid', 'quotationDetails', 'number', 'date', 'clientUuid'])) {
    @IsNotEmpty()
    @Uuid()
    uuid: string;
    
    @IsNotEmpty()
    @IsString()
    number: string;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    @IsString()
    clientUuid: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateQuotationDetailDto)
    quotationDetails: CreateQuotationDetailDto[];
}