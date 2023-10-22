import { Binnacle,
TributeCodeType,
Tribute } from './../../../../shared/domain/model/guatemala';
export const connectionProvider = [
{ provide: 'BinnacleRepository', useValue: Binnacle },
{ provide: 'TributeCodeTypeRepository', useValue: TributeCodeType },
{ provide: 'TributeRepository', useValue: Tribute }];export const models = [
Binnacle,
TributeCodeType,
Tribute];