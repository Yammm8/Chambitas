import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../../services/jobs';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-detail.html'
})
export class JobDetailComponent implements OnInit {
  job?: Job;

  constructor(private route: ActivatedRoute, private jobsService: JobsService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // obtenemos el id de la URL
    this.jobsService.getJobById(id).subscribe(j => this.job = j);
  }
}
