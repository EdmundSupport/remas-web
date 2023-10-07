export class SerializeHelper {

    static objectToQueryParams(object: any, prefix = ''): string {
        const queryParams = [];

        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const value = object[key];
                const paramName = prefix ? `${prefix}[${key}]` : key;

                if (typeof value === 'object' && value !== null) {
                    queryParams.push(SerializeHelper.objectToQueryParams(value, paramName));
                } else if (value !== undefined && value !== null) {
                    queryParams.push(`${(paramName)}=${encodeURIComponent(value)}`);
                }
            }
        }
        const result = queryParams.join('&');
        if(result != '') return '?' + result;
        
        return result;
    }
}