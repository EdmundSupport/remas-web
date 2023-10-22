import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class BinnacleDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	schemaName: string;

	@IsOptional()
	@IsString()
	tableName: string;

	@IsOptional()
	@IsString()
	tableUuid: string;

	@IsOptional()
	@IsString()
	operationType: string;

	@IsOptional()
	@IsString()
	userName: string;

	@IsOptional()
	@IsObject()
	data: object;

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
	pagination: PaginationDto;
}