import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Job } from '../../services/job';

@Component({
  selector: 'app-editar-trabajo',
  imports: [FormsModule],
  templateUrl: './editar-trabajo.html',
  styleUrl: './editar-trabajo.css',
})
export class EditarTrabajoComponent implements OnInit {

  post!: Post; // Se llenará con los datos reales
  categories: Category[] = [];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private jobService: Job
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.jobService.getTrabajoPorId(id).subscribe({
      next: (data: Post) => {
        this.post = data;
        this.selectedCategory = data.category_id ?? null;
      },
      error: (err) => {
        console.error("Error cargando trabajo", err);
      }
    });

    this.categories = [
      { id: 1, name: 'Desarrollo web' },
      { id: 2, name: 'Diseño gráfico' },
      { id: 3, name: 'Redacción de contenido' },
    ];
  }

  selectedCategory: number | null = null;

  goBack(): void {
    this.location.back();
  }
}
