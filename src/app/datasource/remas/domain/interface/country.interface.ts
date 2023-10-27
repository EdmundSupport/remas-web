import { ProvinceInterface } from './province.interface';

import { PaginationInterface } from './pagination.interface';
export interface CountryInterface{
	uuid: string;

	code: string;

	name: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	provinces: ProvinceInterface[];

	pagination: PaginationInterface;
}