import { UrlMapConstant } from "shared/http/domain/constant/url_map.constant";

export class HttpHelper {
    static urlMap(url: string, method: string): string {
        const found = UrlMapConstant.find((found) => url.indexOf(found.url) != -1);
        const message = found
            ? found[method.toLowerCase()]
            : undefined;
        return message;
    }
}