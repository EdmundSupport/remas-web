import { BinnacleInterface } from './binnacle.interface';

import { PersonInterface } from './person.interface';

import { TributeInterface } from './tribute.interface';

import { CompanyInterface } from './company.interface';

import { BranchInterface } from './branch.interface';

import { PaginationInterface } from 'src/api/v1/shared/global/domain/interface/pagination.interface';
export interface IndexInterface{
	pagination: PaginationInterface;
}