import { User as DatasourceUser } from "src/api/v1/datasource"

export type UserInterface = Partial<DatasourceUser>;

export class VerifyUserExistsInterface {
    userName: string;
    users?: UserInterface[];
}

export class SignInInterface {
    user: UserInterface;
}

export class LogInInterface {
    userName: string;
    userPassword: string;
}

export class TokenConfigInterface {
    expiresIn: string;
    secret: string;
}