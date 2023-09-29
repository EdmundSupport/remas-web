import { ExtractInterface } from "shared/filter_response/domain/interface/extract.interface";
import { HttpException, HttpStatus } from '@nestjs/common';
import { FunctionMapConstant } from "shared/filter_response/domain/constant/function_map.constant";
import { HttpStatusInterface } from "shared/filter_response/domain/interface/http-status.interface";

export class FilterResponseHelper {
    static extractOrigin(stack: string) {
        const exp = RegExp(/(at)( )(\w+)(\.)(\w+)( )(.*)(remas_api\\src)(.*)/g);
        const matchs = stack?.matchAll!(exp);
        const extracts: ExtractInterface[] = [];
        for (const match of (matchs ?? [])) {
            const extract: ExtractInterface = {
                class: match[3],
                function: match[5],
                path: match[7] + match[8] + match[9]
            };
            extracts.push(extract);
        }
        return extracts;
    }

    static functionMap(extracts: ExtractInterface[]) {
        const found = FunctionMapConstant.find((found) => found.class == extracts[0].class
            && found.function == extracts[0].function);
        const message = found
            ? found.error
            : 'No se pudo recuperar el error. Contacte al administrador.';
        return message;
    }

    static httpException(status: keyof HttpStatusInterface | number, message: string) {
        const statusCode = typeof status == 'number' ? status : HttpStatus[status];
        return new HttpException({
            statusCode,
            message,
        }, statusCode);
    }
}