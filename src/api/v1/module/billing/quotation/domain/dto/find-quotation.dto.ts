import { OmitType } from "@nestjs/swagger";
import { IsOptional, ValidateIf, IsDefined } from "class-validator";
import { DateRange } from "shared/validation/infrastructure/decoration/date-range.decoration";
import { QuotationDto } from "src/api/v1/datasource/remas/shared/domain/dto/quotation.dto";

export class FindQuotationDto extends OmitType(QuotationDto, ['date']) {
    @IsOptional()
    @DateRange()
    date: Date | [Date, Date]
}