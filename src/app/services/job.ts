import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post.service';

// Reutilizamos el tipo Post para los trabajos del home
export type JobDetail = Post;

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
