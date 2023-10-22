import { Company,
Tribute,
Branch,
Binnacle,
Person } from './../../../../shared/domain/model/identity';
export const connectionProvider = [
{ provide: 'CompanyRepository', useValue: Company },
{ provide: 'TributeRepository', useValue: Tribute },
{ provide: 'BranchRepository', useValue: Branch },
{ provide: 'BinnacleRepository', useValue: Binnacle },
{ provide: 'PersonRepository', useValue: Person }];export const models = [
Company,
Tribute,
Branch,
Binnacle,
Person];