import { User } from "src/api/v1/datasource"

export class UserNameExistsInterface {
    userName: string;
    source?: User[] | Promise<User[]>
}

export class SignInInterface {
    nameFirst: string;
    nameSecond?: string;
    nameOther?: string;
    surnameFirst: string;
    surnameSecond?: string;
    surnameOther?: string;
    birthday?: Date;
    password: string;

}

export class LogInInterface {
    userName: string;
    userPassword: string;
}

export class TokenConfigInterface {
    expiresIn: string;
    secret: string;
}