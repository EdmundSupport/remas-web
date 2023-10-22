import { ProvinceInterface } from './province.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
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