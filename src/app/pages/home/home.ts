import { Component, OnInit } from '@angular/core';
import { PreviewJobCard } from "../../components/preview-job-card/preview-job-card";
import { Job, JobDetail } from '../../services/job';

@Component({
  selector: 'app-home',
  imports: [PreviewJobCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  trabajos: JobDetail[] = [];

  constructor(private jobService: Job) {}

  ngOnInit(){
    this.trabajos = this.jobService.getTrabajos();
  }

}
