import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { StructureHashTable } from 'shared/structure/application/hash/structure.hash_table';
import { TokenConfigInterface } from '../../domain';
import { AuthHelper } from '../../application';
import { FilterResponseHelper } from 'shared/filter_response/application/helper/filter_response.helper';
import { LogHelper } from 'shared/log';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        @Inject('TOKEN_DISABLED')
        private tokenDisabledHashTable: StructureHashTable,
        private authHelper: AuthHelper,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {

            const request = context.switchToHttp().getRequest();
            const token = this.extractTokenFromHeader(request);
            if (!token) throw FilterResponseHelper.httpException('UNAUTHORIZED', 'No se proporciono un token.');
            const data = this.jwtService.decode(token);
            if (!data) throw FilterResponseHelper.httpException('UNAUTHORIZED', 'Token invalido.');
            const sessionUuuid = data!['sessionUuid'];
            if (!sessionUuuid) throw FilterResponseHelper.httpException('UNAUTHORIZED', 'Token invalido.');
            const tokenDisabled = this.tokenDisabledHashTable.get(token);

            if (tokenDisabled != undefined) throw FilterResponseHelper.httpException('UNAUTHORIZED', 'El token fue invalidado por soporte o por cierre de sesion.');
            const tokenAccessConfig = this.authHelper.configFormat(this.configService.get<string>('TOKEN_ACCESS_CONFIG'));
            const verify = await this.jwtService
                .verifyAsync(token, { secret: tokenAccessConfig.secret })
                .catch((error) => null);

            if (!verify) throw FilterResponseHelper.httpException('UNAUTHORIZED', 'El token vencido, vuelva a iniciar sesion.');
            request['sessionUuid'] = data['sessionUuid'];
            return !!verify;
        } catch (error) {
            const ctx = context.switchToHttp();
            const response = ctx.getResponse();
            const request = ctx.getRequest();
            const extracts = FilterResponseHelper.extractOrigin(error.stack);
            const statusCode = error?.response?.statusCode ?? error?.status ?? 500;
            const message = error?.response?.message ?? error?.message ?? FilterResponseHelper.functionMap(extracts);
            LogHelper.printError(request.method, request.url, error.status, { message: error.message, extracts, data: request?.body });
            throw error;
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}