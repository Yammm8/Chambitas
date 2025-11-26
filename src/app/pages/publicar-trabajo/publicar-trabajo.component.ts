import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-publicar-trabajo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publicar-trabajo.component.html',
  styleUrls: ['./publicar-trabajo.component.css']
})
export class PublicarTrabajoComponent {

  // Campos del formulario
  titulo: string = '';
  categoria_id: number | null = null;
  descripcion: string = '';
  pago: number | null = null;
  deadline: string = '';
  ubicacion: string = '';

  // estados UI
  loading = false;
  error = '';
  success = false;

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  publicarTrabajo() {
    if (!this.titulo || !this.descripcion || !this.pago || !this.deadline || !this.categoria_id) {
      this.error = 'Por favor completa todos los campos requeridos.';
      return;
    }

    this.error = '';
    this.loading = true;

    const body = {
      title: this.titulo,
      body: this.descripcion,
      pay: this.pago,
      deadline: this.deadline,
      location: this.ubicacion,
      category_id: this.categoria_id
    };

    this.postService.createPost(body).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1200);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.error = 'No se pudo publicar el trabajo.';
      }
    });
  }
}
