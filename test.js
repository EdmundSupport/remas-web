function serializeToQueryParams(obj, prefix = '') {
    const queryParams = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const paramName = prefix ? `${prefix}[${key}]` : key;

            if (typeof value === 'object' && value !== null) {
                queryParams.push(serializeToQueryParams(value, paramName));
            } else if (value !== undefined && value !== null) {
                queryParams.push(`${(paramName)}=${encodeURIComponent(value)}`);
            }
        }
    }

    return queryParams.join('&');
}

const miObjeto = '';
const queryString = serializeToQueryParams(miObjeto);
console.log(queryString);