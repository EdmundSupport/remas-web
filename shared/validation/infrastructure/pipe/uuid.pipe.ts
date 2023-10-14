// param-text-or-uuid-validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { isUUID, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class NewOrUUIDValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        const { data, metatype } = metadata;

        if (metatype === String) {
            return value; // Si el tipo del parámetro es un string, no es necesario validación adicional.
        }

        if (metatype === undefined) {
            throw new BadRequestException(`Tipo de parámetro no definido.`);
        }

        if (metatype === String || typeof metatype === 'string') {
            // Si se espera un valor de tipo string, simplemente devuelve el valor.
            return value;
        }


        // Validar si el valor es un UUID válido
        if (isUUID(value, 'all')) {
            return value;
        }
        
        throw new BadRequestException('El parámetro no es un UUID válido.');
    }
}
