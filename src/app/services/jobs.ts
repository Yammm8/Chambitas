import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private apiUrl = 'http://localhost:3000/api/trabajos'; // Cambia a tu backend real

  constructor(private http: HttpClient) {}

  getJobs(q?: string, categoria?: string, ordenar?: string): Observable<Job[]> {
    let params = new HttpParams();
    if (q) params = params.set('q', q);
    if (categoria) params = params.set('categoria', categoria);
    if (ordenar) params = params.set('ordenar', ordenar);
    return this.http.get<Job[]>(this.apiUrl, { params });
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }
}

