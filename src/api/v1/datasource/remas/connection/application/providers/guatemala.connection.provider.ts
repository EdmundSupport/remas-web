import { Tribute, TributeCodeType } from "../../../shared/domain/model/guatemala"

export const guatemalaConnectionProvider = [
    { provide: 'GUATEMALA_TRIBUTE_CODE_TYPE_REPOSITORY', useValue: TributeCodeType },
    { provide: 'GUATEMALA_TRIBUTE_REPOSITORY', useValue: Tribute },
]

export const guatemalaModels = [
    TributeCodeType,
    Tribute,
]