import { Body, Controller, Delete, Get, Headers, ParseArrayPipe, Post, UseGuards } from "@nestjs/common";
import { LogInDto, SignInDto } from "../../domain/dto/auth.dto";
import { AuthService } from "../../application";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../guard";

@ApiTags('Autenticación')
@Controller({
    path: 'auth'
})
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @ApiBearerAuth('token-access')
    @UseGuards(AuthGuard)
    @Get('token-valid')
    tokenValid(){
        return 'Autenticado';
    }

    @Post('sign-in')
    signIn(@Body() data: SignInDto) {
        return this.authService.signIn({ user: data });
    }

    @Post('log-in')
    logIn(@Body() data: LogInDto) {
        return this.authService.logIn(data);
    }

    @Get('refresh')
    refresh(@Headers('token-refresh') tokenRefresh: string) {
        return this.authService.refresh(tokenRefresh);
    }

    @Delete('logout')
    tokenLogout(@Body(new ParseArrayPipe({ items: String })) tokens: string[]) {
        return this.authService.tokensLogOut(tokens);
    }
}