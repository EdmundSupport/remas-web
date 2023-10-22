import { CityInterface } from './city.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
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