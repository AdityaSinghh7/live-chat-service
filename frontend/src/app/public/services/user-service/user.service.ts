import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInterface } from '../../../model/user.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  create(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>('backend/users', user).pipe(
      tap((createdUser: UserInterface) => this.snackbar.open(`User: ${createdUser.username} created successfully`, `Close`, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })),
      catchError(e => {
        this.snackbar.open(`ERROR: Unable to create user due to ${e.error?.message}`, 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        return throwError(() => e);
      })
    );
  }


  

  
}
