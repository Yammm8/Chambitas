import { Component, OnInit } from '@angular/core';
import { PreviewJobCard } from "../../components/preview-job-card/preview-job-card";
import { Job, JobDetail } from '../../services/job';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PreviewJobCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  trabajos: JobDetail[] = [];
  loading = false;
  error = '';

  constructor(private jobService: Job) {}

  ngOnInit(): void {
    this.cargarTrabajos();
  }

  cargarTrabajos(): void {
    this.loading = true;
    this.error = '';

    this.jobService.getTrabajos(6, 0).subscribe({
      next: (trabajos: JobDetail[]) => {
        this.trabajos = trabajos;
        this.loading = false;
      },
      error: (err: unknown) => {
        console.error(err);
        this.error = 'Error al cargar los trabajos';
        this.loading = false;
      }
    });
  }
}
