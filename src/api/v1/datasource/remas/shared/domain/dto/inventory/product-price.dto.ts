import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { ProductDto } from './product.dto';

import { MeasureUnitDto } from './measure-unit.dto';

import { PriceCategoryDto } from './price-category.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class ProductPriceDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	amount: string;

	@IsOptional()
	@IsString()
	productUuid: string;

	@IsOptional()
	@IsString()
	measureUnitUuid: string;

	@IsOptional()
	@IsString()
	priceCategoryUuid: string;

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
	product: ProductDto;

	@IsOptional()
	@IsObject()
	measureUnit: MeasureUnitDto;

	@IsOptional()
	@IsObject()
	priceCategory: PriceCategoryDto;

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}