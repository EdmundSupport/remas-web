import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { SessionTypeDto } from './session-type.dto';

import { UserDto } from './user.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class SessionDto{
	@IsOptional()
	@IsString()
	uuid: string;

	@IsOptional()
	@IsString()
	userUuid: string;

	@IsOptional()
	@IsString()
	sessionTypeUuid: string;

	@IsOptional()
	@IsString()
	token: string;

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
	sessionType: SessionTypeDto;

	@IsOptional()
	@IsObject()
	user: UserDto;

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}