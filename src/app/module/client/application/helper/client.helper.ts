import { Injectable } from "@angular/core";
import { ClientService } from "../service/client.service";
import { ClientInterface } from "../../domain/interface/client.interface";

@Injectable({
    providedIn: 'root'
})
export class ClientHelper {
    constructor(
        private clientService: ClientService,
    ) { }

    onClientSelected(client: ClientInterface) {
        this.client = client;
    }

    onClientOptionShow(client: any) {
        return client?.tributes?.companies![0]?.['name'];
    }

    onClientSearch(clientName: string) {
        this.onClientLoad(clientName).subscribe((result) => this.clients = result);
    }

    onClientLoad(clientName: string | undefined) {
        return this.clientService.onFind({ tributes: { companies: { name: clientName } } }, { omitLoading: true }).pipe(
            map((result) => {
                if (result?.statusCode != 200) {
                    this.matSnackBar.open(result?.message, 'Cancelar');
                    return [];
                }
                return result?.data;
            }));
    }

    onClientLoadInitial() {
        this.clientService.onFindLoad$.next(true);
        this.onClientLoad(undefined).pipe(
            finalize(() => this.clientService.onFindLoad$.next(false)))
            .subscribe((data) => {
                this.clients = data;
            });
    }
}