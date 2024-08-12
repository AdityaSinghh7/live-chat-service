import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInterface } from '../../../model/user.interface';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../../../model/login-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  login(user: UserInterface): Observable<LoginResponse>{
    return this.http.post<LoginResponse>('backend/users/login', user).pipe(
      tap((res: LoginResponse) => localStorage.setItem('nestjs_chat_app', res.access_token)),
      tap(() => this.snackbar.open('Login Successfull', 'Close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      }))
    );
  }
}
