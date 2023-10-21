import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmRequestComponent } from "../../infrastructure/component/confirm-request.component";

@Injectable()
export class ConfirmRequestService {
    constructor(
        public dialog: MatDialog
    ) { }

    openDialog(message: string) {
        const dialogRef = this.dialog.open(ConfirmRequestComponent, {
            data: { message },
        });

        return dialogRef.afterClosed();
    }
}