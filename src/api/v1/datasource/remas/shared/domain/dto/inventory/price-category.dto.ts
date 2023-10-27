import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { ProductPriceDto } from './product-price.dto';

import { ProductPackageDto } from './product-package.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class PriceCategoryDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	code: string;

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
	@Type(()=>ProductPriceDto)
	productPrices: ProductPriceDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>ProductPackageDto)
	productPackages: ProductPackageDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}