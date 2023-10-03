import { TokenDisabled, SessionType, User, Permission, Role, Privilege, Session, Module, UserPerson } from "src/api/v1/datasource/remas/shared";
import { Person } from "../../../shared/domain/model/identity";

export const aaaConnectionProvider = [
    { provide: 'TOKEN_DISABLED_REPOSITORY', useValue: TokenDisabled },
    { provide: 'SESSION_TYPE_REPOSITORY', useValue: SessionType },
    { provide: 'SESSION_REPOSITORY', useValue: Session },
    { provide: 'USER_REPOSITORY', useValue: User },
    { provide: 'PERMISSION_REPOSITORY', useValue: Permission },
    { provide: 'ROLE_REPOSITORY', useValue: Role },
    { provide: 'PRIVILEGE_REPOSITORY', useValue: Privilege },
    { provide: 'MODULE_REPOSITORY', useValue: Module },
    { provide: 'USER_PERSON_REPOSITORY', useValue: UserPerson },
]

export const aaaModels = [
    SessionType,
    Session,
    User,
    Role,
    Permission,
    Privilege,
    Module,
    UserPerson,
    Person,
]