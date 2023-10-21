import { Component, Inject } from "@angular/core";
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
    selector: 'app-confirm-request',
    templateUrl: '../page/confirm-request.page.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmRequestComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmRequestComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: { message: string },
    ) { }

    onConfirm() {
        this.dialogRef.close(true);
    }
    onCancel() {
        this.dialogRef.close(false);
    }
}