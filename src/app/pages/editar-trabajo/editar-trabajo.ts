import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-trabajo',
  imports: [FormsModule],
  templateUrl: './editar-trabajo.html',
  styleUrl: './editar-trabajo.css',
})
export class EditarTrabajoComponent {
  post: Post = {
    id: 1,
    title: 'Desarrollador Frontend Angular',
    body: 'Se busca desarrollador con experiencia en Angular y Bootstrap 5.',
    status: true,
    user_id: 1,
    createdAt: '2025-10-19T10:00',
    pay: 5000.0,
    deadline: '2025-11-01',
    location: 'Monterrey, Nuevo León',
  };

  categories: Category[] = [
    { id: 1, name: 'Desarrollo web' },
    { id: 2, name: 'Diseño gráfico' },
    { id: 3, name: 'Redacción de contenido' },
  ];

  selectedCategory = this.categories[0].id;

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
