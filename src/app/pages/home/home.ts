import { Component, OnInit } from '@angular/core';
import { PreviewJobCard } from '../../components/preview-job-card/preview-job-card';
import { Job, JobDetail } from '../../services/job';
import { RouterLink } from '@angular/router';
import { userService } from '../../services/user.service';
import { Post } from '../../services/post.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PreviewJobCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  trabajos: Post[] = [];
  loading = false;
  error = '';
  user: User | null = null;

  constructor(private jobService: Job, private userService: userService) {}

  ngOnInit() {
    this.cargarTrabajos();
    this.user = this.userService.getUsuario();

    this.jobService.getTrabajosLimit(3, 0).subscribe((data: Post[]) => {
      if (this.user) {
        this.trabajos = data.filter((job) => job.user_id !== this.user!.id);
      } else {
        this.trabajos = data;
      }
    });
  }

  cargarTrabajos(): void {
    this.loading = true;
    this.error = '';

    this.jobService.getTrabajosLimit(6, 0).subscribe({
      next: (trabajos: JobDetail[]) => {
        this.trabajos = trabajos;
        this.loading = false;
      },
      error: (err: unknown) => {
        console.error(err);
        this.error = 'Error al cargar los trabajos';
        this.loading = false;
      },
    });
  }
}
