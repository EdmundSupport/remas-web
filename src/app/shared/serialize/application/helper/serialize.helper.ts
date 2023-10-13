export class SerializeHelper {

    static isUUID(uuid: string) {
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        return uuidPattern.test(uuid);
    }

    static objectToQueryParams(originObject: any, originPrefix = ''): string {
        function subObjectToQueryParams(object: any, prefix = ''): string {
            const queryParams = [];

            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    const value = object[key];
                    const paramName = prefix ? `${prefix}[${key}]` : key;

                    if (Array.isArray(value)) {
                        for (let i = 0; i < value.length; i++) {
                            const arrayParamName = `${paramName}[${i}]`;
                            if (value[i] !== undefined && value[i] !== null) {
                                if (typeof value[i] === 'object' && !(value[i] instanceof Date)) {
                                    queryParams.push(subObjectToQueryParams(value[i], arrayParamName));
                                } else if (value[i] instanceof Date) {
                                    // Si es una fecha, conviértela a formato ISO string
                                    queryParams.push(`${arrayParamName}=${encodeURIComponent(value[i].toISOString())}`);
                                } else {
                                    queryParams.push(`${arrayParamName}=${encodeURIComponent(value[i])}`);
                                }
                            }
                        }
                    } else if (typeof value === 'object' && value !== null) {
                        queryParams.push(subObjectToQueryParams(value, paramName));
                    } else if (value !== undefined && value !== null) {
                        if (value instanceof Date) {
                            // Si es una fecha, conviértela a formato ISO string
                            queryParams.push(`${paramName}=${encodeURIComponent(value.toISOString())}`);
                        } else {
                            queryParams.push(`${paramName}=${encodeURIComponent(value)}`);
                        }
                    }
                }
            }

            const result = queryParams.join('&');
            return result;
        }

        const queryParams = subObjectToQueryParams(originObject, originPrefix);
        return queryParams ? '?' + queryParams : '';
    }
}

