import { Component, inject, Input } from '@angular/core';
import { JobDetail } from '../../services/job';
import { Router } from "@angular/router";

@Component({
  selector: 'app-preview-job-card',
  imports: [],
  templateUrl: './preview-job-card.html',
  styleUrl: './preview-job-card.css'
})
export class PreviewJobCard {
  @Input({required: true}) job!: JobDetail;
  private _router = inject(Router);
  goToJob(id: number){
    this._router.navigateByUrl(`job-detail/`+id)
  }
}
