import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type EstadoContrato = 'Activo' | 'Completado' | 'Cancelado';

export interface ContractRaw {
  id: number;
  start_date: string;
  end_date: string;
  status: string; // 'activo' | 'completado' | 'cancelado'
  post_id: number;
  worker_id: number;
  employer_id: number;
  createdAt?: string;
  updatedAt?: string;

  // El backend puede mandar en minúsculas o mayúsculas
  post?: {
    id: number;
    title: string;
    body: string;
    pay: number;
    deadline: string;
    location: string;
    category_id: number;
    createdAt: string;
  };
  Post?: {
    id: number;
    title: string;
    body: string;
    pay: number;
    deadline: string;
    location: string;
    category_id: number;
    createdAt: string;
  };

  worker?: {
    id: number;
    name: string;
    last_name: string;
  };
  Worker?: {
    id: number;
    name: string;
    last_name: string;
  };

  employer?: {
    id: number;
    name: string;
    last_name: string;
  };
  Employer?: {
    id: number;
    name: string;
    last_name: string;
  };
}

export interface UiContract {
  id: number;
  titulo: string;
  trabajador: string;
  categoria: string;
  pago: number;
  fechaInicio: string;
  fechaFin: string;
  creado: string;
  estado: EstadoContrato;
}

@Injectable({
  providedIn: 'root',
})
export class ContratosService {
  private apiUrl = 'http://localhost:4000/api/contract';

  constructor(private http: HttpClient) {}

  /** 🔹 Contratos donde soy trabajador */
  getContractsAsWorker(): Observable<ContractRaw[]> {
    // docs: GET /api/contract/contracts-worker
    return this.http.get<ContractRaw[]>(`${this.apiUrl}/contracts-worker`, {
      withCredentials: true,
    });
  }

  /** 🔹 Contratos donde soy empleador */
  getContractsAsEmployer(): Observable<ContractRaw[]> {
    // docs: GET /api/contract/contracts-employer
    return this.http.get<ContractRaw[]>(`${this.apiUrl}/contracts-employer`, {
      withCredentials: true,
    });
  }

  /** 🔹 Contratos asociados a un post específico (si lo llegan a usar) */
  getContractsByPost(postId: number): Observable<ContractRaw[]> {
    return this.http.get<ContractRaw[]>(`${this.apiUrl}/post/${postId}`, {
      withCredentials: true,
    });
  }

  /** 🔹 Mapear estado backend → UI */
  private mapEstado(status: string): EstadoContrato {
    const s = (status || '').toLowerCase();

    if (s === 'completado') return 'Completado';
    if (s === 'cancelado') return 'Cancelado';
    return 'Activo';
  }

  /** 🔹 Mapear array crudo → modelo para las tarjetas de la UI */
  mapRawToUi(raw: ContractRaw[]): UiContract[] {
    return raw.map((c) => {
      // Soportar post/Post
      const postData = c.post || c.Post;
      // Soportar worker/Worker
      const workerData = c.worker || c.Worker;

      const trabajador =
        workerData && workerData.name && workerData.last_name
          ? `${workerData.name} ${workerData.last_name}`
          : 'Trabajador';

      const categoria = postData?.category_id
        ? `Categoría ${postData.category_id}`
        : 'General';

      const pago = postData?.pay ?? 0;

      const fechaInicio = c.start_date
        ? new Date(c.start_date).toLocaleDateString()
        : '';
      const fechaFin = c.end_date
        ? new Date(c.end_date).toLocaleDateString()
        : '';

      const creado = c.createdAt
        ? new Date(c.createdAt).toLocaleDateString()
        : '';

      const titulo = postData?.title ?? 'Contrato';

      return {
        id: c.id,
        titulo,
        trabajador,
        categoria,
        pago,
        fechaInicio,
        fechaFin,
        creado,
        estado: this.mapEstado(c.status),
      };
    });
  }

  /** 🔹 Cambiar estado de contrato */
  updateContractStatus(id: number, estado: EstadoContrato) {
    let backendStatus = 'activo';
    switch (estado) {
      case 'Completado':
        backendStatus = 'completado';
        break;
      case 'Cancelado':
        backendStatus = 'cancelado';
        break;
      default:
        backendStatus = 'activo';
    }

    return this.http.patch(`${this.apiUrl}/${id}`, { status: backendStatus }, {
      withCredentials: true,
      responseType: 'text', // el endpoint devuelve solo texto
    });
  }
}
