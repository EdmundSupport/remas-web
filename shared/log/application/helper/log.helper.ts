import { ExtractInterface } from "shared/filter_response/domain/interface/extract.interface";
import { ConsoleColorEnum } from "shared/log/domain/enum/console_color.enum";

export class LogHelper {
    static printSuccess(method: string, url: string, status: number) {
        console.log(ConsoleColorEnum.white, new Date().toLocaleString(), ConsoleColorEnum.green, `[SUCCESS]`, `[${method}]`, `[${url}]`, `[${status}]`);
        console.log(ConsoleColorEnum.white);
    }

    static printError(method: string, url: string, status: number, detail: { message: string, extracts?: ExtractInterface[], data?: any }) {
        console.group(ConsoleColorEnum.white, new Date().toLocaleString(), ConsoleColorEnum.red, `[ERROR]`, `[${method}]`, `[${url}]`, `[${status}]`, detail.message);
        if (detail.extracts) detail.extracts.forEach((extract) => {
            console.log(
                ConsoleColorEnum.red + extract.class + '.' + extract.function,
                ConsoleColorEnum.yellow, extract.path
            );
        });
        if (detail.data) console.log(ConsoleColorEnum.yellow, JSON.stringify(detail.data));
        console.groupEnd();
        console.log(ConsoleColorEnum.white);
    }
}