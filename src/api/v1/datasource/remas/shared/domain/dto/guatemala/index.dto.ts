import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { BinnacleDto } from './binnacle.dto';

import { TributeCodeTypeDto } from './tribute-code-type.dto';

import { TributeDto } from './tribute.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class IndexDto{
	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}