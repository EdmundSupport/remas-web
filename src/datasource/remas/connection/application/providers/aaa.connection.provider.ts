import { TokenDisabled, SessionType, User, Permission, Role, Privilege, Session, Module } from "src/datasource/remas/shared";
import { AaaConnectionHelper } from "../helper";

export const aaaConnectionProvider = [
    // AaaConnectionHelper,
    { provide: 'TOKEN_DISABLED_REPOSITORY', useValue: TokenDisabled },
    { provide: 'SESSION_TYPE_REPOSITORY', useValue: SessionType },
    { provide: 'SESSION_REPOSITORY', useValue: Session },
    { provide: 'USER_REPOSITORY', useValue: User },
    { provide: 'PERMISSION_REPOSITORY', useValue: Permission },
    { provide: 'ROLE_REPOSITORY', useValue: Role },
    { provide: 'PRIVILEGE_REPOSITORY', useValue: Privilege },
    { provide: 'MODULE_REPOSITORY', useValue: Module },
]

export const models = [
    SessionType,
    Session,
    User,
    Role,
    Permission,
    Privilege,
    Module,
]