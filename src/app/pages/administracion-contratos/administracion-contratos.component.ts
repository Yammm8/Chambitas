import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administracion-contratos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administracion-contratos.component.html',
  styleUrls: ['./administracion-contratos.component.css']
})
export class AdministracionContratosComponent {
  totalContratos = 0;
  activos = 0;
  completados = 0;
  cancelados = 0;
  filtroActual = 'todos';
  contratos: any[] = [];
  contratosFiltrados: any[] = [];

  ngOnInit() {
    // 👇 Aquí están los datos simulados
    this.contratos = [
      {
        titulo: 'Limpieza de Casa completa',
        trabajador: 'Juan Pérez',
        categoria: 'Limpieza',
        pago: 50000,
        fechaInicio: '14/1/2024',
        fechaFin: '14/1/2024',
        creado: '12/1/2024',
        estado: 'Completado'
      },
      {
        titulo: 'Cuidado de Perro - Fin de Semana',
        trabajador: 'Carlos López',
        categoria: 'Cuidado',
        pago: 40000,
        fechaInicio: '19/1/2024',
        fechaFin: '20/1/2024',
        creado: '18/1/2024',
        estado: 'Activo'
      },
      {
        titulo: 'Ayudante de Cocina - Evento',
        trabajador: 'Ana García',
        categoria: 'Cocina',
        pago: 50000,
        fechaInicio: '19/1/2024',
        fechaFin: '20/1/2024',
        creado: '12/1/2024',
        estado: 'Activo'
      },
      {
        titulo: 'Jardinería y Poda',
        trabajador: 'Pedro Ramos',
        categoria: 'Jardinería',
        pago: 30000,
        fechaInicio: '8/1/2024',
        fechaFin: '9/1/2024',
        creado: '5/1/2024',
        estado: 'Cancelado'
      }
    ];

    // 👇 Esto rellena correctamente los contadores y la lista inicial
    this.actualizarContadores();
    this.contratosFiltrados = [...this.contratos];
  }

  actualizarContadores() {
    this.totalContratos = this.contratos.length;
    this.activos = this.contratos.filter(c => c.estado === 'Activo').length;
    this.completados = this.contratos.filter(c => c.estado === 'Completado').length;
    this.cancelados = this.contratos.filter(c => c.estado === 'Cancelado').length;
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

  goBack() {
    console.log('Volver al dashboard');
  }

  buscarMas() {
    console.log('Buscar más trabajos');
  }
}
