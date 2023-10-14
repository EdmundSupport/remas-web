import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { ValidationHelper } from 'shared/validation/application/helper/validation.helper';

export function Uuid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'uuid',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: { message: 'El campo uuid debe ser tipo uuid o la palabra new.', ...validationOptions },
            validator: {
                validate(value: any, args: ValidationArguments) {
                    console.log("🚀 ~ file: uuid.decoration.ts:14 ~ validate ~ value:", value)
                    if(ValidationHelper.isUUID(value)) return true;
                    if(value == 'new') return true;
                    return false;
                },
            },
        });
    };
}
