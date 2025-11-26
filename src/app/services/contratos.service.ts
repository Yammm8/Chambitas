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
  createdAt: string;
  updatedAt: string;
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
  worker?: {
    id: number;
    name: string;
    last_name: string;
  };
  employer?: {
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
    return this.http.get<ContractRaw[]>(`${this.apiUrl}/worker`, {
      withCredentials: true,
    });
  }

  /** 🔹 Contratos donde soy empleador */
  getContractsAsEmployer(): Observable<ContractRaw[]> {
    return this.http.get<ContractRaw[]>(`${this.apiUrl}/employer`, {
      withCredentials: true,
    });
  }

  /** 🔹 Contratos asociados a un post específico */
  getContractsByPost(postId: number): Observable<ContractRaw[]> {
    return this.http.get<ContractRaw[]>(`${this.apiUrl}/post/${postId}`, {
      withCredentials: true,
    });
  }

  /** 🔹 Mapear estado backend → UI */
  private mapEstado(status: string): EstadoContrato {
    switch (status) {
      case 'completado':
        return 'Completado';
      case 'cancelado':
        return 'Cancelado';
      default:
        return 'Activo';
    }
  }

  /** 🔹 Mapear array crudo → modelo para las tarjetas de la UI */
  mapRawToUi(raw: ContractRaw[]): UiContract[] {
    return raw.map((c) => {
      const trabajador =
        c.worker?.name && c.worker?.last_name
          ? `${c.worker.name} ${c.worker.last_name}`
          : 'Trabajador';

      const categoria = c.post?.category_id
        ? `Categoría ${c.post.category_id}`
        : 'General';

      const pago = c.post?.pay ?? 0;

      const fechaInicio = c.start_date
        ? new Date(c.start_date).toLocaleDateString()
        : '';
      const fechaFin = c.end_date
        ? new Date(c.end_date).toLocaleDateString()
        : '';

      const creado = c.createdAt
        ? new Date(c.createdAt).toLocaleDateString()
        : '';

      const titulo = c.post?.title ?? 'Contrato';

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

  /** 🔹 Cambiar estado de contrato (por si luego lo usas) */
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

    return this.http.patch(
      `${this.apiUrl}/${id}`,
      { status: backendStatus },
      { withCredentials: true }
    );
  }
}
