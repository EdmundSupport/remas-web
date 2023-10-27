import { ProvinceInterface } from './province.interface';

import { AddressInterface } from './address.interface';

import { PaginationInterface } from './pagination.interface';
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