import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-administracion-contratos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './administracion-contratos.component.html',
  styleUrls: ['./administracion-contratos.component.css']
})
export class AdministracionContratosComponent {
  contratos: any[] = [];
  contratosFiltrados: any[] = [];
  filtroActual = 'todos';

  stats: any[] = [];
  filtros = ['todos', 'activos', 'completados', 'cancelados'];

  ngOnInit() {
    this.contratos = [
      { titulo: 'Limpieza de Casa completa', trabajador: 'Juan Pérez', categoria: 'Limpieza', pago: 50000, fechaInicio: '14/1/2024', fechaFin: '14/1/2024', creado: '12/1/2024', estado: 'Completado' },
      { titulo: 'Cuidado de Perro - Fin de Semana', trabajador: 'Carlos López', categoria: 'Cuidado', pago: 40000, fechaInicio: '19/1/2024', fechaFin: '20/1/2024', creado: '18/1/2024', estado: 'Activo' },
      { titulo: 'Ayudante de Cocina - Evento', trabajador: 'Ana García', categoria: 'Cocina', pago: 50000, fechaInicio: '19/1/2024', fechaFin: '20/1/2024', creado: '12/1/2024', estado: 'Activo' },
      { titulo: 'Jardinería y Poda', trabajador: 'Pedro Ramos', categoria: 'Jardinería', pago: 30000, fechaInicio: '8/1/2024', fechaFin: '9/1/2024', creado: '5/1/2024', estado: 'Cancelado' }
    ];

    this.actualizarStats();
    this.contratosFiltrados = [...this.contratos];
  }

  actualizarStats() {
    const total = this.contratos.length;
    const activos = this.contratos.filter(c => c.estado === 'Activo').length;
    const completados = this.contratos.filter(c => c.estado === 'Completado').length;
    const cancelados = this.contratos.filter(c => c.estado === 'Cancelado').length;

    this.stats = [
      { label: 'Total', count: total, icon: 'bi bi-file-earmark-text', bgClass: 'bg-primary text-white' },
      { label: 'Activos', count: activos, icon: 'bi bi-hourglass-split', bgClass: 'bg-warning text-white' },
      { label: 'Completados', count: completados, icon: 'bi bi-check-circle', bgClass: 'bg-success text-white' },
      { label: 'Cancelados', count: cancelados, icon: 'bi bi-x-circle', bgClass: 'bg-danger text-white' }
    ];
  }

  filtrar(tipo: string) {
    this.filtroActual = tipo;
    switch (tipo) {
      case 'activos':
        this.contratosFiltrados = this.contratos.filter(c => c.estado === 'Activo');
        break;
      case 'completados':
        this.contratosFiltrados = this.contratos.filter(c => c.estado === 'Completado');
        break;
      case 'cancelados':
        this.contratosFiltrados = this.contratos.filter(c => c.estado === 'Cancelado');
        break;
      default:
        this.contratosFiltrados = [...this.contratos];
        break;
    }
  }

  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }

  buscarMas() {
    console.log('Buscar más trabajos');
  }
}
