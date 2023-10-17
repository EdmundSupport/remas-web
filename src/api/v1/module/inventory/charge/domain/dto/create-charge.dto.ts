import { OmitType, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsNotEmpty, IsDate, IsString, IsArray, ValidateNested } from "class-validator";
import { ChargeDetailScheduledDto } from "src/api/v1/datasource/remas/shared/domain/dto/charge-detail-scheduled.dto";
import { ChargeDetailDto } from "src/api/v1/datasource/remas/shared/domain/dto/charge-detail.dto";
import { ChargeDto } from "src/api/v1/datasource/remas/shared/domain/dto/charge.dto";

export class CreateChargeDetailDto extends PartialType(OmitType(ChargeDetailDto, ['amount', 'measureUnitUuid'])) {
    @IsNotEmpty()
    @IsString()
    amount: string;

    @IsNotEmpty()
    @IsString()
    measureUnitUuid: string;
}
export class CreateChargeDetailScheduledDto extends PartialType(OmitType(ChargeDetailScheduledDto, ['amount', 'productUuid', 'measureUnitUuid', 'chargeDetails'])) {
    @IsNotEmpty()
    @IsString()
    amount: string;

    @IsNotEmpty()
    @IsString()
    productUuid: string;

    @IsNotEmpty()
    @IsString()
    measureUnitUuid: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateChargeDetailDto)
    chargeDetails: CreateChargeDetailDto[];
}
export class CreateChargeDto extends PartialType(OmitType(ChargeDto, ['number', 'dateStartScheduled', 'dateEndScheduled', 'dateStart', 'dateEnd', 'chargeDetailScheduleds'])) {
    @IsNumber()
    number: number;

    @IsNotEmpty()
    @IsDate()
    dateStartScheduled: Date;

    @IsNotEmpty()
    @IsDate()
    dateEndScheduled: Date;

    @IsNotEmpty()
    @IsDate()
    dateStart: Date;

    @IsNotEmpty()
    @IsDate()
    dateEnd: Date;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateChargeDetailScheduledDto)
    chargeDetailScheduleds: CreateChargeDetailScheduledDto[];
}