import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PostUser {
  id: number;
  name: string;
  last_name: string;
  email: string;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  pay: number;
  deadline: string;
  status: boolean;
  location: string;
  user_id: number;
  category_id: number;
  createdAt: string;
  updatedAt: string;

  // 👇 el backend manda el objeto user anidado
  user?: PostUser;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:4000/api/post';

  constructor(private http: HttpClient) {}

  /** Lista de posts (pública o general) */
  getPosts(limit: number = 10, page: number = 0): Observable<Post[]> {
    const params = new HttpParams().set('limit', limit).set('page', page);

    return this.http.get<Post[]>(this.apiUrl, {
      params,
      withCredentials: true,
    });
  }

  /** 🔹 Posts creados por el usuario logueado */
  getPostsByUser(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/postsByUser`, {
      withCredentials: true,
    });
  }

  /** Obtener un post por id (detalle / editar) */
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  /** Crear post (usa /create-post y respuesta en TEXTO) */
  createPost(data: any) {
    return this.http.post(`${this.apiUrl}/create-post`, data, {
      withCredentials: true,
      // el backend regresa un texto tipo "Post de trabajo creado correctamente"
      responseType: 'text' as const,
    });
  }

  updatePost(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data, {
      withCredentials: true,
    });
  }
}
