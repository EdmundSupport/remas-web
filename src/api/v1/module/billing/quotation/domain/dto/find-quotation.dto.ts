import { OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsArray, IsOptional, ValidateIf, IsDefined } from "class-validator";
import { QuotationDto } from "src/api/v1/datasource/remas/shared/domain/dto/quotation.dto";

export class FindQuotationDto extends OmitType(QuotationDto, ['date']) {
    @IsOptional()
    @ValidateIf((o) => Array.isArray(o) || o instanceof Date)
    @IsDefined({ message: 'Debes proporcionar ya sea fecha o rangoDeFechas.' })
    date: Date | [Date, Date]
}