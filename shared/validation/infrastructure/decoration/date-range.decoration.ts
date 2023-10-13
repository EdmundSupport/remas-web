import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function DateRange(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'dateRange',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: { message: 'La fecha esta incorrecta, debe ser una fecha o un rango de fechas.', ...validationOptions },
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const date = value;
                    let result = true;
                    if (Array.isArray(date)) {
                        const startDate = date[0] && `${Date.parse(date[0])}` != 'NaN' ? new Date(Date.parse(date[0])) : undefined;
                        const endDate = date[date.length - 1] && `${Date.parse(date[0])}` != 'NaN' ? new Date(Date.parse(date[date.length - 1])) : undefined;
                        result = (startDate && endDate) ? true : false;
                    } else if (date instanceof Date) {
                        result = `${Date.parse(date.toISOString())}` != 'NaN' ? true : false;
                    } else {
                        result = `${Date.parse(date)}` != 'NaN' ? true : false;
                    }
                    return result;
                },
            },
        });
    };
}
