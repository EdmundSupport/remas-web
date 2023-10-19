import { IsArray, IsBoolean, IsDate, IsObject, IsOptional, IsString, Validate, ValidateNested } from "class-validator";
import { PersonDto } from "./person.dto";
import { Type } from "class-transformer";
import { PaginationDto } from "src/api/v1/shared/global/domain/dto/pagination.dto";
import { RoleDto } from "./role.dto";

export class UserDto {

    @IsOptional()
    @IsString()
    uuid: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsBoolean()
    condition: boolean;

    @IsOptional()
    @IsString()
    roleUuid: string;

    @IsOptional()
    @IsDate()
    createdAt: Date;

    @IsOptional()
    @IsDate()
    updatedAt: Date;

    @IsOptional()
    @IsObject()
    role: RoleDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PersonDto)
    persons: PersonDto[];

    @IsOptional()
    @IsObject()
    pagination: PaginationDto;
}