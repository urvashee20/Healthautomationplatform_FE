import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginDto, RegisterDto, TokenResponse } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  
  public isLoggedIn = signal<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  register(data: RegisterDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, { responseType: 'text' });
  }

  login(credentials: LoginDto): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.isLoggedIn.set(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  hasToken(): boolean {
    return !!this.getToken();
  }
}
