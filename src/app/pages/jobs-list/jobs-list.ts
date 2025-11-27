import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job, JobDetail } from '../../services/job';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobs-list',
  imports: [FormsModule, CurrencyPipe, CommonModule],
  templateUrl: './jobs-list.html',
  styleUrl: './jobs-list.css'
})
export class JobsListComponent implements OnInit {
  @Input({ required: true }) job!: JobDetail;
  private _router = inject(Router);

  goToJob(id: number) {
    this._router.navigateByUrl(`job-detail/` + id)
  }

  jobs: Post[] = [];
  allJobs: Post[] = [];   // 🔹 copia del array original
  categories: Category[] = [];


  cargando: boolean = false;
  error: string | null = null;

  q: string = '';
  categoria: string = '';
  ordenar: string = 'recientes';

  constructor(private router: Router, private jobService: Job) {}

  ngOnInit() {
  // Obtener trabajos
  this.jobService.getTrabajos().subscribe((data: Post[]) => {
    this.jobs = data;
    this.allJobs = [...data];
  });

  // Obtener categorías
  this.jobService.getCategories().subscribe((data: Category[]) => {
    this.categories = data;
  });
}



  aplicar() {
  let filtrados = [...this.allJobs];

  // 🔹 FILTRO POR BÚSQUEDA (en título o ubicación)
  if (this.q.trim() !== '') {
    const qLower = this.q.toLowerCase();
    filtrados = filtrados.filter(job =>
      job.title.toLowerCase().includes(qLower) ||
      job.location.toLowerCase().includes(qLower)
    );
  }

  if (this.categoria !== '') {
  const catId = Number(this.categoria);
  filtrados = filtrados.filter(job => job.category_id === catId);
}



  // 🔹 ORDENAMIENTO
  if (this.ordenar === 'recientes') {
    filtrados = filtrados.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (this.ordenar === 'pago') {
    filtrados = filtrados.sort((a, b) => b.pay - a.pay);
  }

  // 🔹 Mostramos el resultado filtrado
  this.jobs = filtrados;
}


  limpiar() {
  this.q = '';
  this.categoria = '';
  this.ordenar = 'recientes';
  this.jobs = [...this.allJobs]; // Volvemos a mostrar todo
}


  verDetalles(id: number) {
    this.router.navigate(['/jobs', id]);
  }

  getCategoryName(id?: number): string {
  if (!id) return 'Sin categoría';
  const cat = this.categories.find(c => c.id === id);
  return cat ? cat.name : 'Sin categoría';
}

}
