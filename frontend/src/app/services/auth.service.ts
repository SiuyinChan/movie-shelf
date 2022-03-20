import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { User } from "../models/user.model";
import { Observable, tap } from "rxjs";
import { TokenResponse } from "../models/token-response.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.API_BASE_URL;

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/auth/register`, user)
  }

  login(user: User): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.baseUrl}/auth/login`, user).pipe(
      tap((res: TokenResponse) => {
        sessionStorage.setItem('token', res.token);
      }));
  }

}
