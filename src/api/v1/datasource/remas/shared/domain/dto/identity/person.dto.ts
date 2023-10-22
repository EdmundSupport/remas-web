import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class PersonDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	number: string;

	@IsOptional()
	@IsString()
	nameFirst: string;

	@IsOptional()
	@IsString()
	nameSecond: string;

	@IsOptional()
	@IsString()
	nameOther: string;

	@IsOptional()
	@IsString()
	surnameFirst: string;

	@IsOptional()
	@IsString()
	surnameSecond: string;

	@IsOptional()
	@IsString()
	surnameOther: string;

	@IsOptional()
	@IsDate()
	birthday: Date;

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