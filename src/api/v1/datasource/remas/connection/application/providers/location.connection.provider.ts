import { Address, City, Country, Province } from "../../../shared/domain/model/location"

export const locationConnectionProvider = [
    { provide: 'COUNTRY_REPOSITORY', useValue: Country },
    { provide: 'PROVINCE_REPOSITORY', useValue: Province },
    { provide: 'CITY_REPOSITORY', useValue: City },
    { provide: 'ADDRESS_REPOSITORY', useValue: Address },
]

export const locationModels = [
    Country,
    Province,
    City,
    Address,
]