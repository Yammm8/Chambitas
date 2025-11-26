import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:4000/api/post';

  constructor(private http: HttpClient) {}

  // Traer posts (lo que ya usas en el dashboard)
  getPosts(limit: number = 10, page: number = 0): Observable<Post[]> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('page', page);

    return this.http.get<Post[]>(this.apiUrl, {
      params,
      withCredentials: true, // para mandar la cookie del token
    });
  }

  // 👇 NUEVO: traer un post por id para la pantalla de editar
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }
  createPost(data: any) {
  return this.http.post(this.apiUrl, data, {
    withCredentials: true
  });
}
  updatePost(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data, {
      withCredentials: true,
    });
  }

}
