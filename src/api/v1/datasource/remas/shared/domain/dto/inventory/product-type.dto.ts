import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { ProductDto } from './product.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class ProductTypeDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	keyName: string;

	@IsOptional()
	@IsString()
	name: string;

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
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>ProductDto)
	products: ProductDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}