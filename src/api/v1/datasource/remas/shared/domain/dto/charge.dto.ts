import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { UserDto } from "./user.dto";
import { ChargeStatusDto } from "./charge-status.dto";
import { ChargeDetailScheduledDto } from "./charge-detail-scheduled.dto";

export class ChargeDto{

    @IsOptional()
    @IsString()
    uuid: string;

    @IsOptional()
    @IsString()
    number: string;

    @IsOptional()
    @IsDate()
    dateStartScheduled: Date;

    @IsOptional()
    @IsDate()
    dateEndScheduled: Date;

    @IsOptional()
    @IsDate()
    dateStart: Date;

    @IsOptional()
    @IsDate()
    dateEnd: Date;

    @IsOptional()
    @IsString()
    userUuid: string;

    @IsOptional()
    @IsString()
    chargeStatusUuid: string;

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
    chargeStatus: ChargeStatusDto;

    @IsOptional()
    @IsObject()
    user: UserDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>ChargeDetailScheduledDto)
    chargeDetailScheduleds: ChargeDetailScheduledDto[];
}