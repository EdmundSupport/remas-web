import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { BinnacleDto } from './binnacle.dto';

import { PersonDto } from './person.dto';

import { TributeDto } from './tribute.dto';

import { CompanyDto } from './company.dto';

import { BranchDto } from './branch.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class IndexDto{
	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}