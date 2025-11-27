import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
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

  validateSession(): Observable<User> {
  return this.http.get<User>(`${this.baseUrl}/user`, {
    withCredentials: true,
  });
}



  logout() {
  return this.http.post(`${this.baseUrl}/auth/logout`, {}, { 
    withCredentials: true, responseType: 'text'
  });
  }


  register(payload: UserDetail): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/create-account`, payload);
  }

isLoggedIn(): Observable<boolean> {
  const usuario = this.userService.getUsuario();

  // Si ya está en memoria → true directo
  if (usuario) {
    return of(true);
  }

  // Si no, intenta restaurar sesión usando la cookie
  return this.validateSession().pipe(
    map(user => {
      this.userService.setUsuario(user);
      return true;
    }),
    catchError(() => of(false))
  );
}


  getUserData() {
    return this.http.get<User>(`${this.baseUrl}/user/`, {
      withCredentials: true,
    });
  }

  getUserById(userId: Number){
    return this.http.get<User>(`${this.baseUrl}/user/${userId}`, {
      withCredentials: true,
    });
  }

  }
