import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Job } from '../../services/job';

@Component({
  selector: 'app-publicar-trabajo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publicar-trabajo.component.html',
  styleUrls: ['./publicar-trabajo.component.css'],
})
export class PublicarTrabajoComponent implements OnInit {
  titulo = '';
  categoria = '';
  descripcion = '';
  pago: number | null = null;
  fechaLimite = '';
  ubicacion = '';
  categorias: Category[] = [];

  loading = false;
  error = '';
  success = false;

  constructor(private postService: PostService, private jobService: Job) {}
  
  ngOnInit(): void {

    this.jobService.getCategories().subscribe((data: Category[]) => {
    this.categorias = data;
  });

  }

  onSubmit() {
    this.error = '';
    this.success = false;

    if (
      !this.titulo ||
      !this.categoria ||
      !this.descripcion ||
      !this.pago ||
      !this.fechaLimite
    ) {
      this.error = 'Por favor llena todos los campos obligatorios.';
      return;
    }


    const payload = {
      title: this.titulo,
      body: this.descripcion,
      pay: this.pago,
      deadline: this.fechaLimite,
      location: this.ubicacion,
      category_id: this.categoria,
    };

    this.loading = true;

    this.postService.createPost(payload).subscribe({
      next: (resp: string) => {
        console.log('Respuesta create-post:', resp);
        this.loading = false;
        this.success = true;

        // Limpia el formulario
        this.titulo = '';
        this.categoria = '';
        this.descripcion = '';
        this.pago = null;
        this.fechaLimite = '';
        this.ubicacion = '';
      },
      error: (err) => {
        console.error('Error al crear post:', err);
        this.loading = false;
        this.error = 'Ocurrió un error al publicar el trabajo.';
      },
    });
  }
}
