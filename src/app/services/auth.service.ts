import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserDetail, userService } from './user.service';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
  user: UserDetail;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private router = inject(Router);
  private userService = inject(userService);
  constructor() { }
  login(email:string, password: string){
    return this.http.post(`${this.baseUrl}/auth/login`, { email, password }, { withCredentials: true, responseType: 'text' })
  }


  logout() {
  return this.http.post(`${this.baseUrl}/auth/logout`, {}, { 
    withCredentials: true, responseType: 'text'
  });
  }


  register(payload: UserDetail): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/create-account`, payload);
  }

  isLoggedIn(): boolean {
    const usuario = this.userService.getUsuario();
    if (usuario){
      return true;
    }
    return false;
  }

  getUserData() {
    return this.http.get<User>(`${this.baseUrl}/user/`, {
      withCredentials: true,
    });
  }

  }
