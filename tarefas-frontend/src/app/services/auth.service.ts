import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(usuario: Usuario): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, usuario).pipe(
      tap(response => {
        if (this.isBrowser()) localStorage.setItem('token', response.token);
      })
    );
  }

  registrar(usuario: Usuario): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/registrar`, usuario).pipe(
      tap(response => {
        if (this.isBrowser()) localStorage.setItem('token', response.token);
      })
    );
  }

  logout() {
    if (this.isBrowser()) localStorage.removeItem('token');
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('token');
  }

  isLogentado(): boolean {
    return !!this.getToken();
  }
}