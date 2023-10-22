import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { SessionDto } from './session.dto';

import { RoleDto } from './role.dto';

import { PersonDto } from './../identity/person.dto';

import { UserPersonDto } from './user-person.dto';

import { PaginationDto } from 'src/api/v1/shared/global/domain/dto/pagination.dto';
export class UserDto{
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
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>SessionDto)
	sessions: SessionDto[];

	@IsOptional()
	@IsObject()
	role: RoleDto;

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>PersonDto)
	people: PersonDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({each: true})
	@Type(()=>UserPersonDto)
	userPeople: UserPersonDto[];

	@IsOptional()
	@IsObject()
	pagination: PaginationDto;
}