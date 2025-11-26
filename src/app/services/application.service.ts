import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Application {
  id: number;
  status: string;
  post: {
    id: number;
    title: string;
    location: string;
    body: string;
    pay: number;
    deadline: string;
    category_id: number;
    createdAt: string;
  };
  // opcionales, por si el backend los manda:
  user?: {
    id: number;
    name: string;
    last_name: string;
    address?: string;
  };
  createdAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {

  private apiUrl = 'http://localhost:4000/api/application';

  constructor(private http: HttpClient) {}

  /** 🔹 Aplicaciones del trabajador logueado */
  getMyApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/worker`, {
      withCredentials: true, // manda cookie JWT
    });
  }

  /** 🔹 Aplicaciones de un post específico (para el empleador) */
  getApplicationsByPost(postId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/post/${postId}`, {
      withCredentials: true,
    });
  }

  /** 🔹 Cambiar estado de una solicitud (por si luego aceptas/rechazas) */
  updateApplicationStatus(id: number, status: string) {
    return this.http.patch(
      `${this.apiUrl}/${id}`,
      { status },
      { withCredentials: true }
    );
  }
}
