import { City,
Province,
Address,
Binnacle,
Country } from './../../../../shared/domain/model/contact';
export const connectionProvider = [
{ provide: 'CityRepository', useValue: City },
{ provide: 'ProvinceRepository', useValue: Province },
{ provide: 'AddressRepository', useValue: Address },
{ provide: 'BinnacleRepository', useValue: Binnacle },
{ provide: 'CountryRepository', useValue: Country }];export const models = [
City,
Province,
Address,
Binnacle,
Country];