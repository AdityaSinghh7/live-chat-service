import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthService{
    constructor(private router: Router, private jwtService: JwtHelperService){}

    isAuthenticated(): boolean{
        const token = localStorage.getItem('nestjs_chat_app');
        if (!token || this.jwtService.isTokenExpired(token)) {
            this.router.navigate(['']);
            return false;
        } else {
            return true;
        }
    }
}