import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsStringOrArray(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isStringOrArray',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: { message: `${propertyName} debe ser un texto, o solo un arreglo de textos.`, ...validationOptions },
            validator: {
                validate(value: any, args: ValidationArguments) {
                    let result = true;
                    if (Array.isArray(value)) {
                        return value.reduce((accepted, currentValue) => {
                            if (typeof value != 'string') {
                                return false;
                            }
                            return accepted;
                        }, true);
                    }
                    return typeof value != 'string';
                },
            },
        });
    };
}
