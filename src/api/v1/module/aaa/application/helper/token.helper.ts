import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { TokenConfigInterface } from "../../domain";
import { FilterResponseHelper } from "shared/filter_response/application/helper/filter_response.helper";

export class TokenHelper {
    constructor(
        private jwtService: JwtService
    ) { }

    async tokenGenerate(data: any, options: JwtSignOptions) {
        return await this.jwtService.signAsync(data, options);
    }

    decode(token: string): any {
        const verify = this.jwtService.verifyAsync(token);

        if (!verify) throw FilterResponseHelper.httpException('UNAUTHORIZED', 'Token invalido, vuelva a iniciar sesion o solicite ayuda a soporte.');
        const data = this.jwtService.decode(token);
        return data;
    }

    configFormat(config: TokenConfigInterface) {
        return { expiresIn: config['expiresIn'], secret: String(config['secret']) }
    }
}