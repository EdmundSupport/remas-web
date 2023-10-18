import { Body, Controller, Delete, Get, Headers, Param, ParseArrayPipe, Post, UseGuards } from "@nestjs/common";
import { LogInDto, SignInDto } from "../../domain/dto/auth.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../guard";
import { AuthzService } from "../../application/service/authz.service";
import { NewOrUUIDValidationPipe } from "shared/validation/infrastructure/pipe/uuid.pipe";

@ApiTags('Autorizacion')
@Controller({
    path: 'authz'
})
export class AuthzController {
    constructor(
        private authzService: AuthzService,
    ) { }

    // @ApiBearerAuth('token-access')
    // @UseGuards(AuthGuard)
    // @Get('token-valid')
    // tokenValid(){
    //     return 'Autenticado';
    // }

    @Get('')
    findAll() {
        return this.authzService.findAll();
    }

    @Get('role/:uuid')
    refresh(@Param('uuid', NewOrUUIDValidationPipe) uuid: string) {
        return this.authzService.findOne(uuid);
    }
}