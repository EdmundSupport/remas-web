import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { ClientService } from "../service/client.service";
import { ClientInterface } from "../../domain/interface/client.interface";

@Injectable({
    providedIn: 'root',
})
export class ClientAutocompleteHelper {
    onClientChange!: (client: ClientInterface) => void;
    onClientsChange!: (client: ClientInterface[]) => void;
    constructor(
        private clientService: ClientService,
    ) { }

    // setOnClientChange(client: ClientInterface) {
    //     if (this.onClientChange) this.onClientChange(client);
    // }

    // setOnClientsChange(client: ClientInterface) {
    //     if (this.onClientChange) this.onClientChange(client);
    // }

    onClientSelected(client?: ClientInterface) {
        if (!!this.onClientChange) this.onClientChange(client!);
    }

    onClientOptionShow(client: ClientInterface) {
        return client?.tributes?.companies![0]?.['name'];
    }

    onClientSearch(clientName: string) {
        this.onClientLoad(clientName).subscribe((results) => !!this.onClientsChange ? this.onClientsChange(results) : undefined);
    }

    onClientLoad(clientName: string | undefined) {
        return this.clientService.onFind({ tributes: { companies: { name: clientName } } }, { omitLoading: true }).pipe(
            map((result) => {
                if (result?.statusCode != 200) {
                    // this.matSnackBar.open(result?.message, 'Cancelar');
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
                if (!!this.onClientsChange) this.onClientsChange(data)
            });
    }
}