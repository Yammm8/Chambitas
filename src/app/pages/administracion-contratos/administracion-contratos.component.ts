import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  ContratosService,
  UiContract,
  EstadoContrato,
} from '../../services/contratos.service';

@Component({
  selector: 'app-administracion-contratos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './administracion-contratos.component.html',
  styleUrls: ['./administracion-contratos.component.css'],
})
export class AdministracionContratosComponent {
  contratos: UiContract[] = [];
  contratosFiltrados: UiContract[] = [];

  /**  🔥 Cambiado a string para que NO genere error con el HTML */
  filtroActual: string = 'todos';

  stats: { label: string; count: number; icon: string; bgClass: string }[] = [];
  filtros: string[] = ['todos', 'activos', 'completados', 'cancelados'];

  loading = false;
  error = '';

  constructor(
    private location: Location,
    private contratosService: ContratosService
  ) {}

  ngOnInit() {
    this.cargarContratos();
  }

  goBack() {
    this.location.back();
  }

  /** Cargar contratos del backend (como TRABAJADOR) */
  cargarContratos() {
    this.loading = true;
    this.error = '';

    this.contratosService.getContractsAsWorker().subscribe({
      next: (raw) => {
        // 1) mapear a modelo de la UI
        this.contratos = this.contratosService.mapRawToUi(raw);

        // 2) aplicar filtro actual y actualizar estadísticas
        this.filtrar(this.filtroActual, false);
        this.actualizarStats();

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar los contratos.';
        this.loading = false;
      },
    });
  }

  actualizarStats() {
    const total = this.contratos.length;
    const activos = this.contratos.filter((c) => c.estado === 'Activo').length;
    const completados = this.contratos.filter(
      (c) => c.estado === 'Completado'
    ).length;
    const cancelados = this.contratos.filter(
      (c) => c.estado === 'Cancelado'
    ).length;

    this.stats = [
      {
        label: 'Total',
        count: total,
        icon: 'bi bi-file-earmark-text',
        bgClass: 'bg-primary text-white',
      },
      {
        label: 'Activos',
        count: activos,
        icon: 'bi bi-hourglass-split',
        bgClass: 'bg-warning text-white',
      },
      {
        label: 'Completados',
        count: completados,
        icon: 'bi bi-check-circle',
        bgClass: 'bg-success text-white',
      },
      {
        label: 'Cancelados',
        count: cancelados,
        icon: 'bi bi-x-circle',
        bgClass: 'bg-danger text-white',
      },
    ];
  }

  /**  
   *  🔥 Cambiado: ahora acepta string para que NO dé error en el template  
   *  Pero internamente sigue funcionando exacto igual  
   */
  filtrar(tipo: string, actualizarFiltro: boolean = true) {
    if (actualizarFiltro) {
      this.filtroActual = tipo;
    }

    switch (tipo) {
      case 'activos':
        this.contratosFiltrados = this.contratos.filter(
          (c) => c.estado === 'Activo'
        );
        break;

      case 'completados':
        this.contratosFiltrados = this.contratos.filter(
          (c) => c.estado === 'Completado'
        );
        break;

      case 'cancelados':
        this.contratosFiltrados = this.contratos.filter(
          (c) => c.estado === 'Cancelado'
        );
        break;

      default:
        this.contratosFiltrados = [...this.contratos];
        break;
    }
  }

  marcarComoCompletado(contrato: UiContract) {
    const destino: EstadoContrato = 'Completado';
    console.log('Marcar contrato', contrato.id, 'como', destino);
  }

  buscarMas() {
    console.log('Buscar más trabajos');
  }
}
