import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class MeasureDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    uuid: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    keyName: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    name: string;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    condition: boolean;

    @IsDate()
    @IsOptional()
    @ApiPropertyOptional()
    createdAt: Date;

    @IsDate()
    @IsOptional()
    @ApiPropertyOptional()
    updatedAt: Date;
}