import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Post, PostService } from '../../services/post.service';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    CurrencyPipe,
    RouterModule,
  ],
  templateUrl: './job-detail.html',
  styleUrls: ['./job-detail.css'],
})
export class JobDetailComponent implements OnInit {
  job!: Post;
  jobId!: number;
  cargando = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.jobId) {
      this.error = 'Trabajo no encontrado';
      return;
    }

    this.cargarTrabajo(this.jobId);
  }

  cargarTrabajo(id: number) {
    this.cargando = true;
    this.error = null;

    this.postService.getPostById(id).subscribe({
      next: (post) => {
        this.job = post;
        this.cargando = false;
        console.log('Job detail cargado:', this.job);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar el trabajo';
        this.cargando = false;
      },
    });
  }

  aplicar() {
    console.log('Aplicando a:', this.job?.title);
    // Aquí luego ya harás el POST /application/create-application/:postId
  }
}
