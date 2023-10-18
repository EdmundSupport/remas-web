import { UserInterface } from "src/app/datasource/remas/domain/interface/user.interface";

export interface CreateUserInterface extends Partial<Omit<UserInterface, 'name' | 'password'>> {
    name: string;
    password: string;
}