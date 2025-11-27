import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contract } from '../models/contract.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContratosService {
  private http= inject(HttpClient)
  private baseUrl = environment.apiUrl;

  constructor() {}

  obtenerContratos(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.baseUrl}/contract/contracts-worker`, {
      withCredentials: true,
    });
  }

  getContractsEmployer(): Observable<Contract[]>{
    return this.http.get<Contract[]>(`${this.baseUrl}/contract/contracts-employer`, {
      withCredentials: true,
    });
  }
}
