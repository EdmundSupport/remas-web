import { BinnacleInterface } from './binnacle.interface';

import { CountryInterface } from './country.interface';

import { ProvinceInterface } from './province.interface';

import { CityInterface } from './city.interface';

import { AddressInterface } from './address.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface IndexInterface{
	pagination: PaginationInterface;
}