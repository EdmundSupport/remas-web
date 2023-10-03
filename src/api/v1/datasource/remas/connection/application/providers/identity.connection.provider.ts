import { Branch, Company, Person, Tribute } from "../../../shared/domain/model/identity"

export const identityConnectionProvider = [
    { provide: 'TRIBUTE_REPOSITORY', useValue: Tribute },
    { provide: 'COMPANY_REPOSITORY', useValue: Company },
    { provide: 'BRANCH_REPOSITORY', useValue: Branch },
    { provide: 'PERSON_REPOSITORY', useValue: Person },
]

export const identityModels = [
    Tribute,
    Company,
    Branch,
    Person,
]