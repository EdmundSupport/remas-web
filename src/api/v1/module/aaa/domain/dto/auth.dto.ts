import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    nameFirst: string;

    @IsString()
    @IsOptional()
    nameSecond?: string;

    @IsString()
    @IsOptional()
    nameOther?: string;

    @IsString()
    @IsNotEmpty()
    surnameFirst: string;

    @IsString()
    @IsOptional()
    surnameSecond?: string;

    @IsString()
    @IsOptional()
    surnameOther?: string;

    @IsDate()
    @IsOptional()
    birthday?: Date;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class LogInDto {
    @IsNotEmpty({message: 'Debe ingresar el nombre del usuario'})
    @IsString()
    userName: string;
    
    @IsNotEmpty({message: 'Debe ingresar la contraseña'})
    @IsString()
    userPassword: string;
}