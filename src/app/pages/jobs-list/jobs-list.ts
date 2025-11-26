import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Post, PostService } from '../../services/post.service';

@Component({
  selector: 'app-jobs-list',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, CommonModule],
  templateUrl: './jobs-list.html',
  styleUrl: './jobs-list.css',
})
export class JobsListComponent implements OnInit {

  jobs: Post[] = [];
  cargando = false;
  error: string | null = null;

  q: string = '';
  categoria: string = '';
  ordenar: string = 'recientes';

  constructor(
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.cargarTrabajos();
  }

  cargarTrabajos() {
    this.cargando = true;
    this.error = null;

    this.postService.getPosts(100, 0).subscribe({
      next: (res) => {
        this.jobs = res;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error cargando trabajos';
        console.error(err);
        this.cargando = false;
      }
    });
  }

  aplicar() {
    // Aquí iría la lógica real de filtros
    console.log('Filtros:', this.q, this.categoria, this.ordenar);
  }

  limpiar() {
    this.q = '';
    this.categoria = '';
    this.ordenar = 'recientes';
  }

  goToJob(id: number) {
    this.router.navigateByUrl(`job-detail/${id}`);
  }
}
