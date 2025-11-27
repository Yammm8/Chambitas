import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface JobDetail {
  id: number;
  titulo: string;
  categoria: string;
  ubicacion: string;
  descripcion: string;
  pago: number;
  fechaPublicacion: string;
  fechaLimite: string;
  empleador: string;
  miembroDesde: string;
}

@Injectable({
  providedIn: 'root'
})

export class Job {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient)
  
  getTrabajos(): Observable<Post[]>{
  return this.http.get<Post[]>(`${this.baseUrl}/post/`);
}

  getTrabajoPorId(id: number): Observable<Post>{
    return this.http.get<Post>(`${this.baseUrl}/post/${id}`);
  }

  getTrabajosLimit(limit: number, page: number): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.baseUrl}/post?limit=${limit}&page=${page}`)
  }

  getCategories(): Observable<Category[]> {
  return this.http.get<Category[]>(`${this.baseUrl}/categories`);
}

}
