import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @IsString()
    name?: string;

    @IsString()
    password?: string;
}

export class LogInDto {
    @IsNotEmpty({message: 'Debe ingresar el nombre del usuario'})
    @IsString()
    userName: string;
    
    @IsNotEmpty({message: 'Debe ingresar la contraseña'})
    @IsString()
    userPassword: string;
}