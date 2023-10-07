export class StructureHelper {
    constructor() { }

    static searchProperty(object: any, searchProp: string, deleted = false) {
        // object = JSON.parse(JSON.stringify(object));
        function search(obj: any) {
            if (typeof obj === 'object') {
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (key === searchProp) {
                            results.push(JSON.parse(JSON.stringify(obj[key])));
                            if (deleted) delete obj[key];
                        } else {
                            search(obj[key]);
                        }
                    }
                }
            }
        }
        const results = [];
        search(object);
        return results;
    }
}