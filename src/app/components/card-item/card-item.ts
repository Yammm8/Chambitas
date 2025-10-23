import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface CardItem {
  id?: number; // opcional, útil si luego quieres identificarlo
  titulo: string;
  nombre?: string; // para solicitudes
  trabajador?: string; // para contratos
  ubicacion?: string; // para solicitudes
  categoria?: string;
  pago?: number;
  fecha?: string; // fecha de solicitud
  fechaInicio?: string; // contratos
  fechaFin?: string; // contratos
  estado: string;
  tipo: 'solicitud' | 'contrato';
}

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-item.html',
  styleUrl: './card-item.css',
})
export class CardItem {
  @Input() item!: CardItem;

  @Output() estadoCambiado = new EventEmitter<{ id?: number; nuevoEstado: string }>();

  get opcionesEstado(): string[] {
    if (this.item.tipo === 'solicitud') {
      return ['Pendiente', 'Aceptada', 'Rechazada'];
    } else {
      return ['Activo', 'Completado', 'Cancelado'];
    }
  }

  cambiarEstado(nuevo: string) {
    this.item.estado = nuevo;
    this.estadoCambiado.emit({ id: this.item.id, nuevoEstado: nuevo });
  }

  guardarCambios() {
    this.estadoCambiado.emit({ id: this.item.id, nuevoEstado: this.item.estado });
  }
}
