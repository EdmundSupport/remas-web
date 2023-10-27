import { CountryInterface } from './country.interface';

import { CityInterface } from './city.interface';

import { PaginationInterface } from './pagination.interface';
export interface ProvinceInterface{
	uuid: string;

	code: string;

	name: string;

	countryUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	country: CountryInterface;

	cities: CityInterface[];

	pagination: PaginationInterface;
}