import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";
import { SessionAttributes } from "src/datasource";

export class CreateDto implements SessionAttributes {
    @IsOptional()
    @IsString()
    uuid?: string;

    @IsString()
    userUuid?: string;

    @IsString()
    sessionTypeUuid?: string;

    @IsString()
    token?: string;

    @IsOptional()
    @IsBoolean()
    condition?: boolean;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;
}

export class FindDto implements SessionAttributes {
    @IsOptional()
    @IsString()
    uuid?: string;

    @IsOptional()
    @IsString()
    userUuid?: string;

    @IsOptional()
    @IsString()
    sessionTypeUuid?: string;

    @IsOptional()
    @IsString()
    token?: string;

    @IsOptional()
    @IsBoolean()
    condition?: boolean;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;
}

export class UpdateDto implements SessionAttributes {
    @IsOptional()
    @IsString()
    uuid?: string;

    @IsOptional()
    @IsString()
    userUuid?: string;

    @IsOptional()
    @IsString()
    sessionTypeUuid?: string;

    @IsOptional()
    @IsString()
    token?: string;

    @IsOptional()
    @IsBoolean()
    condition?: boolean;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;
}