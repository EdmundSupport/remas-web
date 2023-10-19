import {
    Component, ElementRef,
} from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleInterface } from 'src/app/datasource/remas/domain/interface/role.interface'
import { RoleService } from 'src/app/datasource/remas/application/service/role.service';
import { PermissionInterface } from 'src/app/datasource/remas/domain/interface/permission.interface';
import { RolePermissionInterface } from 'src/app/datasource/remas/domain/interface/role-permission.interface';
import { ModuleService } from 'src/app/datasource/remas/application/service/module.service';
import { ModuleInterface } from 'src/app/datasource/remas/domain/interface/module.interface';
import { SerializeHelper } from 'src/app/shared/serialize/application/helper/serialize.helper';

@Component({
    selector: 'app-role-form',
    templateUrl: '../page/role-form.page.html',
    styleUrls: ['../style/role-form.style.scss'],
})
export class RoleFormComponent {
    role: Partial<RoleInterface> = {
        uuid: '',
        keyName: '',
        name: '',
        users: [],
        permissions: [],
        rolePermissions: [],
        pagination: undefined
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
        private roleService: RoleService,
        private moduleService: ModuleService
    ) {
        this.role.uuid = this.route.snapshot.paramMap.get('uuid')!;
    }

    ngOnInit() {
        if (this.role.uuid) {
            this.onLoadOne(this.role.uuid).add(() => {
                this.onLoadModules();
            });
        }
    }

    onLoadOne(uuid: string) {
        return this.roleService.onFindOne(uuid).subscribe((result) => {
            if (result?.statusCode && result?.statusCode != 200) {
                this.matSnackBar.open(result?.message ?? 'No se pudo recuperar el error.');
                return;
            }

            if (result) {
                this.role = result;
            }
        });
    }

    onLoadModules() {
        return this.moduleService.onFind({ privileges: [{ condition: true } as any] }).
            subscribe((result) => {
                if (result?.statusCode && result?.statusCode != 200) {
                    this.matSnackBar.open(result?.message ?? 'No se pudo recuperar el error.');
                    return;
                }
                this.modules = result;
            });
    }

    onSwithPermission(permissionUuid: string, event: { checked: boolean }) {
        if (!permissionUuid) return;
        const rolePermissionIndex = this.role.rolePermissions?.findIndex((rolePermission) => rolePermission.permissionUuid == permissionUuid);
        if (rolePermissionIndex == -1) {
            this.role.rolePermissions?.push({
                permissionUuid,
                roleUuid: this.role.uuid == 'new' ? undefined : this.role.uuid,
                condition: event.checked
            } as any);
            return;
        }

        if(!rolePermissionIndex && rolePermissionIndex != 0) return;
        this.role.rolePermissions![rolePermissionIndex].condition = event.checked;
    }
    onShowRolePermission(permissionUuid?: string) {
        const rolePermission = this.role.rolePermissions?.find((rolePermission) => rolePermission.permissionUuid == permissionUuid);
        if (!rolePermission) return false;
        if (!rolePermission.condition) return false;
        return rolePermission.condition;
    }

    onSave(){
        if (!(this.role && this.role.uuid && this.role.uuid != '' && SerializeHelper.isUUID(this.role.uuid))) {
            this.roleService.onCreate({...this.role, product: undefined} as any).pipe(
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

        if ((this.role && this.role.uuid && this.role.uuid != '' && SerializeHelper.isUUID(this.role.uuid))) {
            this.roleService.onUpdate(this.role.uuid, {...this.role, product: undefined} as any).pipe(
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
