import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../interfaces/auth/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.baseUrl;
  private http = inject(HttpClient);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  }

  login(login: LoginRequest) {
    const url = `${this.apiUrl}/users/login?useCookies=true`;
    const body = login;

    return this.http.post(url, body, this.httpOptions).pipe(
      catchError(() => {
        return throwError(() => new Error("Login Error. Please try again later"))
      })
    );
  }
}
