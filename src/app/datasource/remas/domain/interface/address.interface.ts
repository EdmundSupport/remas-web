import { CityInterface } from './city.interface';

import { PaginationInterface } from './pagination.interface';
export interface AddressInterface{
	uuid: string;

	description: string;

	cityUuid: string;

	condition: boolean;

	createdAt: Date;

	updatedAt: Date;

	city: CityInterface;

	pagination: PaginationInterface;
}