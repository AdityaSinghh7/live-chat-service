import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { text } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'http://localhost:3000/backend';

  constructor(private http: HttpClient) { }

  getTestData(): Observable<{title: string}>{
    return this.http.get<{title: string}>(this.apiUrl);
  }
}
