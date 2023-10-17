// import { MaintenanceFormComponent } from "./infrastructure/component/maintenance-form.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from "@angular/core";
import { MaintenanceComponent } from "./infrastructure/component/maintenance.component";
import { MaintenanceFormComponent } from "./infrastructure/component/maintenance-form.component";
import { MaintenanceStepComponent } from "./infrastructure/component/maintenance-step.component";
import { MaintenanceStepDetailComponent } from "./infrastructure/component/maintenance-step-detail.component";
import { MaintenanceStepDetailMultipleComponent } from "./infrastructure/component/maintenance-step-detail-multiple.component";
import { MaintenanceRoutingModule } from "./maintenance-routing.module";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SuperpositionLoadingComponent } from "src/app/shared/component/superposition-loading/infrastructure/component/superposition-loading.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { ButtonFloatComponent } from "src/app/shared/component/button-float/infrastructure/component/button-float.component";
import { CalendarModule } from "src/app/shared/component/calendar/calendar.module";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
    declarations: [
        MaintenanceComponent,
        MaintenanceFormComponent,
        MaintenanceStepComponent,
        MaintenanceStepDetailComponent,
        MaintenanceStepDetailMultipleComponent,
    ],  
    imports: [
        CommonModule,
        FormsModule,
        MatSnackBarModule,
        MaintenanceRoutingModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        SuperpositionLoadingComponent,
        ButtonFloatComponent,
        CalendarModule,
        
    ]
})
export class MaintenanceModule { }