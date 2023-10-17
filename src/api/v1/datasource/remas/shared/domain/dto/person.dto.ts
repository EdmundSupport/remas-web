import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class PersonDto{

    @IsOptional()
    @IsString()
    uuid: string;

    @IsOptional()
    @IsString()
    number: string;

    @IsOptional()
    @IsString()
    nameFirst: string;

    @IsOptional()
    @IsString()
    nameSecond: string;

    @IsOptional()
    @IsString()
    nameOther: string;

    @IsOptional()
    @IsString()
    surnameFirst: string;

    @IsOptional()
    @IsString()
    surnameSecond: string;

    @IsOptional()
    @IsString()
    surnameOther: string;

    @IsOptional()
    @IsDate()
    birthday: Date;

    @IsOptional()
    @IsBoolean()
    condition: boolean;

    @IsOptional()
    @IsDate()
    createdAt: Date;

    @IsOptional()
    @IsDate()
    updatedAt: Date;
}