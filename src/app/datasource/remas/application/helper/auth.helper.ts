import { Injectable } from "@angular/core";
import { TokenHelper } from "./token.helper";
import { Router } from "@angular/router";
import { AuthService } from "../service/auth.service";

@Injectable({
    providedIn: 'root',
})
export class AuthHelper {
    constructor(
        private tokenHelper: TokenHelper,
    ) { }

    onIsAuthenticated(){
        const token = this.tokenHelper.onGetTokenAccess();
        return !!token;
    }
}