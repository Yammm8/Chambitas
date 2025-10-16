import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common'; // 👈 Importar DatePipe y CurrencyPipe si usas $

// Definición de la interfaz
interface JobDetail {
  id: number;
  titulo: string;
  categoria: string;
  ubicacion: string;
  descripcion: string;
  pago: number;
  fechaPublicacion: string;
  fechaLimite: string;
  empleador: string;
  miembroDesde: string;
}

@Component({
  selector: 'app-job-detail',
  standalone: true, // 👈 Esto es importante para componentes sin NgModule
  imports: [
    CommonModule,   // para directivas básicas (*ngIf, *ngFor)
    DatePipe,       // para usar {{ ... | date }}
    CurrencyPipe    // si usas {{ pago | currency }}
  ],
  templateUrl: './job-detail.html',
  styleUrls: ['./job-detail.css'] // 👈 corregido (plural)
})
export class JobDetailComponent implements OnInit {
  job!: JobDetail;

  ngOnInit() {
    this.job = {
      id: 2,
      titulo: 'Repartidor de Comida - Zona Norte',
      categoria: 'Delivery',
      ubicacion: 'Norte, Ciudad',
      descripcion:
        'Buscamos repartidores para zona norte de la ciudad. Horarios flexibles, moto propia preferible. Pago por entrega más propinas.',
      pago: 30000,
      fechaPublicacion: '2024-01-08',
      fechaLimite: '2024-01-19',
      empleador: 'Restaurante El Buen Sabor',
      miembroDesde: '2023'
    };
  }

  aplicar() {
    console.log('Aplicando a:', this.job.titulo);
  }
}
