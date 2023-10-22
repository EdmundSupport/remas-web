import { ProvinceInterface } from './province.interface';

import { AddressInterface } from './address.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface CityInterface{
	uuid: string;

	code: string;

	name: string;

	provinceUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	province: ProvinceInterface;

	addresses: AddressInterface[];

	pagination: PaginationInterface;
}