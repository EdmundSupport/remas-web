import { OmitType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { UserDto } from "src/api/v1/datasource/remas/shared/domain/dto/user.dto";

export class CreateUserDto extends PartialType(OmitType(UserDto, ['name', 'password'])){
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}