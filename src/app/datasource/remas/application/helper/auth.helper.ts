import { Injectable } from "@angular/core";
import { TokenHelper } from "./token.helper";
import { Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthHelper {
    constructor(
        private tokenHelper: TokenHelper,
    ) { }

    onIsAuthenticated() {
        const token = this.tokenHelper.onGetTokenAccess();
        return !!token;
    }

    verifyPermission(permissionKeyName: string) {
        const token = this.tokenHelper.onGetTokenAccess();
        try {
            const data: { role: { permissions: { keyName: string }[] } } = jwt_decode(token);
            const permission = data.role.permissions.find((permission) => permission.keyName == permissionKeyName);
            if (permission) return true;
            else return false;
        } catch (Error) {
            return null;
        }
    }
}