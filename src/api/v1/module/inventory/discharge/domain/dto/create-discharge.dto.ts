import { OmitType, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsNotEmpty, IsDate, IsString, IsArray, ValidateNested } from "class-validator";
import { DischargeDetailScheduledDto } from "src/api/v1/datasource/remas/shared/domain/dto/inventory/discharge-detail-scheduled.dto";
import { DischargeDetailDto } from "src/api/v1/datasource/remas/shared/domain/dto/inventory/discharge-detail.dto";
import { DischargeDto } from "src/api/v1/datasource/remas/shared/domain/dto/inventory/discharge.dto";

export class CreateDischargeDetailDto extends PartialType(OmitType(DischargeDetailDto, ['amount', 'measureUnitUuid'])) {
    @IsNotEmpty()
    @IsString()
    amount: string;

    @IsNotEmpty()
    @IsString()
    measureUnitUuid: string;
}
export class CreateDischargeDetailScheduledDto extends PartialType(OmitType(DischargeDetailScheduledDto, ['amount', 'productUuid', 'measureUnitUuid', 'dischargeDetails'])) {
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
    @Type(() => CreateDischargeDetailDto)
    dischargeDetails: CreateDischargeDetailDto[];
}
export class CreateDischargeDto extends PartialType(OmitType(DischargeDto, ['number', 'dateStartScheduled', 'dateEndScheduled', 'dateStart', 'dateEnd', 'dischargeDetailScheduleds'])) {
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
    @Type(() => CreateDischargeDetailScheduledDto)
    dischargeDetailScheduleds: CreateDischargeDetailScheduledDto[];
}