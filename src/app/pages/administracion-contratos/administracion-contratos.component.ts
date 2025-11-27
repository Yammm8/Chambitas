import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import {
  ContratosService,
  ContractRaw,
  EstadoContrato,
} from '../../services/contratos.service';

type RolContrato = 'trabajador' | 'empleador';
type EstadoContratoUI = 'Activo' | 'Completado' | 'Cancelado';
type FiltroEstado = 'Todos' | EstadoContratoUI;

interface ContratoUI {
  id: number;
  rol: RolContrato;
  titulo: string;
  contraparte: string;
  ubicacion: string;
  categoria: string;
  pago: number;
  fechaInicio: string;
  fechaFin: string;
  estado: EstadoContratoUI;
}

@Component({
  selector: 'app-administracion-contratos',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './administracion-contratos.component.html',
  styleUrls: ['./administracion-contratos.component.css'],
})
export class AdministracionContratosComponent implements OnInit {
  // contratos completos
  contratosTrabajador: ContratoUI[] = [];
  contratosEmpleador: ContratoUI[] = [];

  // filtrados según estado
  contratosTrabajadorFiltrados: ContratoUI[] = [];
  contratosEmpleadorFiltrados: ContratoUI[] = [];

  // pestaña y filtro
  tabActual: RolContrato = 'trabajador';
  filtros: FiltroEstado[] = ['Todos', 'Activo', 'Completado', 'Cancelado'];
  filtroActual: FiltroEstado = 'Todos';

  // estado general
  loading = false;
  error = '';
  actualizandoId: number | null = null;

  constructor(private contratosService: ContratosService) {}

  ngOnInit(): void {
    this.cargarContratos();
  }

  private cargarContratos(): void {
    this.loading = true;
    this.error = '';

    forkJoin<[ContractRaw[], ContractRaw[]]>([
      this.contratosService.getContractsAsWorker(),
      this.contratosService.getContractsAsEmployer(),
    ]).subscribe({
      next: ([workerContracts, employerContracts]) => {
        this.contratosTrabajador = workerContracts.map((c) =>
          this.mapContractToUI(c, 'trabajador')
        );
        this.contratosEmpleador = employerContracts.map((c) =>
          this.mapContractToUI(c, 'empleador')
        );

        this.actualizarFiltrados();
        this.loading = false;

        console.log('Contratos trabajador:', this.contratosTrabajador);
        console.log('Contratos empleador:', this.contratosEmpleador);
      },
      error: (err: any) => {
        console.error(err);
        this.error = 'No se pudieron cargar tus contratos.';
        this.loading = false;
      },
    });
  }

  private mapContractToUI(c: ContractRaw, rol: RolContrato): ContratoUI {
    const post = c.post || c.Post;
    const worker = c.worker || c.Worker;
    const employer = c.employer || c.Employer;

    const contraparteUser = rol === 'trabajador' ? employer : worker;

    const nombreContraparte = contraparteUser
      ? `${contraparteUser.name ?? ''} ${contraparteUser.last_name ?? ''}`.trim()
      : 'Sin nombre';

    // estado
    const s = (c.status || '').toLowerCase();
    let estado: EstadoContratoUI = 'Activo';
    if (s === 'completado' || s === 'terminado') estado = 'Completado';
    if (s === 'cancelado') estado = 'Cancelado';

    const fechaInicio = c.start_date ? c.start_date.split('T')[0] : '';
    const fechaFin = c.end_date ? c.end_date.split('T')[0] : '';

    const categoria =
      post && typeof post.category_id === 'number'
        ? `Categoría #${post.category_id}`
        : 'Sin categoría';

    return {
      id: c.id,
      rol,
      titulo: post?.title ?? `Publicación #${post?.id ?? c.post_id ?? '—'}`,
      contraparte: nombreContraparte || 'Sin nombre',
      ubicacion: post?.location ?? 'Sin ubicación',
      categoria,
      pago: post?.pay ?? 0,
      fechaInicio,
      fechaFin,
      estado,
    };
  }

  cambiarTab(tab: RolContrato): void {
    this.tabActual = tab;
    this.actualizarFiltrados();
  }

  cambiarFiltro(filtro: FiltroEstado): void {
    this.filtroActual = filtro;
    this.actualizarFiltrados();
  }

  private aplicarFiltro(lista: ContratoUI[]): ContratoUI[] {
    if (this.filtroActual === 'Todos') return lista;
    return lista.filter((c) => c.estado === this.filtroActual);
  }

  private actualizarFiltrados(): void {
    this.contratosTrabajadorFiltrados = this.aplicarFiltro(
      this.contratosTrabajador
    );
    this.contratosEmpleadorFiltrados = this.aplicarFiltro(
      this.contratosEmpleador
    );
  }

  /** Botón "Marcar como completado" */
  marcarCompletado(contrato: ContratoUI): void {
    if (contrato.estado === 'Completado') return;

    this.actualizandoId = contrato.id;
    this.error = '';

    const nuevoEstado: EstadoContrato = 'Completado';

    this.contratosService
      .updateContractStatus(contrato.id, nuevoEstado)
      .subscribe({
        next: () => {
          contrato.estado = 'Completado';
          this.actualizandoId = null;
        },
        error: (err: any) => {
          console.error(err);
          this.error = 'No se pudo actualizar el contrato.';
          this.actualizandoId = null;
        },
      });
  }

  /** Para saber qué lista mostrar según la pestaña */
  get listaVisible(): ContratoUI[] {
    return this.tabActual === 'trabajador'
      ? this.contratosTrabajadorFiltrados
      : this.contratosEmpleadorFiltrados;
  }

  get tituloTabActual(): string {
    return this.tabActual === 'trabajador'
      ? 'Contratos como trabajador'
      : 'Contratos como empleador';
  }
}
