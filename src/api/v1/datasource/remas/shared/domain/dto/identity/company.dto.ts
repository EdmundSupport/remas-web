import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { TributeDto } from './tribute.dto';

import { BranchDto } from './branch.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class CompanyDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	tributeUuid: string;

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
	tribute: TributeDto;

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>BranchDto)
	branches: BranchDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}