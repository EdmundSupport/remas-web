import {
    Component, ElementRef,
} from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInterface } from 'src/app/datasource/remas/domain/interface/user.interface'
import { UserService } from 'src/app/datasource/remas/application/service/user.service';
import { PermissionInterface } from 'src/app/datasource/remas/domain/interface/permission.interface';
import { ModuleService } from 'src/app/datasource/remas/application/service/module.service';
import { ModuleInterface } from 'src/app/datasource/remas/domain/interface/module.interface';
import { SerializeHelper } from 'src/app/shared/serialize/application/helper/serialize.helper';

@Component({
    selector: 'app-user-form',
    templateUrl: '../page/user-form.page.html',
    styleUrls: ['../style/user-form.style.scss'],
})
export class UserFormComponent {
    user: Partial<UserInterface> = {
    };

    total!: number;

    onSaveLoading$ = new BehaviorSubject<boolean>(false);
    timeSaveLoading: any;

    modules!: ModuleInterface[];

    constructor(
        private matSnackBar: MatSnackBar,
        private elementRef: ElementRef,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private moduleService: ModuleService
    ) {
        this.user.uuid = this.route.snapshot.paramMap.get('uuid')!;
    }

    ngOnInit() {
        if (this.user.uuid) {
            this.onLoadOne(this.user.uuid).add(() => {
                this.user.password = '';
            });
        }
    }

    onLoadOne(uuid: string) {
        return this.userService.onFindOne(uuid).subscribe((result) => {
            if (result?.statusCode && result?.statusCode != 200) {
                this.matSnackBar.open(result?.message ?? 'No se pudo recuperar el error.');
                return;
            }

            if (result) {
                this.user = result;
            }
        });
    }

    onSave(){
        console.log("🚀 ~ file: user-form.component.ts:102 ~ UserFormComponent ~ onSave ~ this.user:", this.user)
        if(this.user.password == '') delete this.user.password;

        if (!(this.user && this.user.uuid && this.user.uuid != '' && SerializeHelper.isUUID(this.user.uuid))) {
            this.userService.onCreate({...this.user, product: undefined} as any).pipe(
                finalize(() => this.onStopSaveLoading()))
                .subscribe((result: any) => {
                    if (result?.statusCode && result?.statusCode != 201) {
                        this.matSnackBar.open(result?.message ?? 'No se pudo recuperar el error.', 'OK');
                        return;
                    }

                    this.matSnackBar.open(result?.message ?? 'Rol creado con exito.', 'OK');
                    this.router.navigate(['../'], { relativeTo: this.route })
                });
            return;
        }

        if ((this.user && this.user.uuid && this.user.uuid != '' && SerializeHelper.isUUID(this.user.uuid))) {
            this.userService.onUpdate(this.user.uuid, {...this.user, product: undefined} as any).pipe(
                finalize(() => this.onStopSaveLoading()))
                .subscribe((result: any) => {
                    if (result.statusCode && result.statusCode != 200) {
                        this.matSnackBar.open(result?.message ?? 'No se pudo recuperar el error.', 'OK');
                    } else {
                        this.matSnackBar.open(result?.message ?? 'Rol actualizado con exito.', 'OK');
                        this.router.navigate(['../'], { relativeTo: this.route });
                    }
                });
            return;
        }
    }

    onStopSaveLoading() {
        this.onSaveLoading$.next(false)
        clearTimeout(this.timeSaveLoading);
    }
}
