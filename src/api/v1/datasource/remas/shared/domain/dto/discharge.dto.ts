import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { UserDto } from "./user.dto";
import { DischargeStatusDto } from "./discharge-status.dto";
import { DischargeDetailScheduledDto } from "./discharge-detail-scheduled.dto";

export class DischargeDto{

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
    dischargeStatusUuid: string;

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
    dischargeStatus: DischargeStatusDto;

    @IsOptional()
    @IsObject()
    user: UserDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>DischargeDetailScheduledDto)
    dischargeDetailScheduleds: DischargeDetailScheduledDto[];
}