import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApplicationPost {
  id: number;
  title: string;
  body: string;
  location: string;
  pay: number;
  deadline: string;
  category_id: number;
  createdAt: string;
}

export interface ApplicationUser {
  id: number;
  name: string;
  last_name: string;
  address?: string;
}

export interface Application {
  id: number;
  status: string;
  user_id: number;
  post_id: number;
  createdAt: string;
  updatedAt: string;

  // lo que manda el backend:
  Post?: ApplicationPost;
  User?: ApplicationUser;

  // por compatibilidad si algún endpoint usa minúsculas:
  post?: ApplicationPost;
  user?: ApplicationUser;
}



@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private apiUrl = 'http://localhost:4000/api/application';

  constructor(private http: HttpClient) {}

  /** 🔹 Todas las aplicaciones del usuario logueado */
  getMyApplications(): Observable<Application[]> {
    // GET http://localhost:4000/api/application/
    return this.http.get<Application[]>(this.apiUrl, {
      withCredentials: true,
    });
  }

  /** 🔹 Aplicaciones de un post específico (para el empleador) */
  getApplicationsByPost(postId: number): Observable<Application[]> {
    // GET http://localhost:4000/api/application/:postId
    return this.http.get<Application[]>(`${this.apiUrl}/${postId}`, {
      withCredentials: true,
    });
  }

  /** 🔹 Crear aplicación a un trabajo */
  createApplication(postId: number): Observable<string> {
    // POST http://localhost:4000/api/application/create-application/:postId
    return this.http.post(
      `${this.apiUrl}/create-application/${postId}`,
      {},
      {
        withCredentials: true,
        responseType: 'text', // el backend regresa texto plano
      }
    );
  }

  /**
   * 🔹 Cambiar estado de una solicitud
   *   PATCH /api/application/:applicationId
   *   body: { status, start_date? }
   */
  updateApplicationStatus(
    id: number,
    status: string,
    start_date?: string
  ): Observable<string> {
    const body: any = { status };
    if (start_date) {
      body.start_date = start_date;
    }

    return this.http.patch(
      `${this.apiUrl}/${id}`,
      body,
      {
        withCredentials: true,
        // el endpoint regresa texto plano: "Aplicación actualizada correctamente"
        responseType: 'text',
      }
    );
  }
}
