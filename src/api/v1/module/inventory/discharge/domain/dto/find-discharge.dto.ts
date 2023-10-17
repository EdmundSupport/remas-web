import { OmitType } from "@nestjs/swagger";
import { IsOptional, ValidateIf, IsDefined } from "class-validator";
import { DateRange } from "shared/validation/infrastructure/decoration/date-range.decoration";
import { DischargeDto } from "src/api/v1/datasource/remas/shared/domain/dto/discharge.dto";

export class FindDischargeDto extends OmitType(DischargeDto, ['dateStartScheduled','dateEndScheduled','dateStart','dateEnd']) {
    @IsOptional()
    @DateRange()
    dateStartScheduled: Date | [Date, Date];

    @IsOptional()
    @DateRange()
    dateEndScheduled: Date | [Date, Date];

    @IsOptional()
    @DateRange()
    dateStart: Date | [Date, Date];

    @IsOptional()
    @DateRange()
    dateEnd: Date | [Date, Date];
}