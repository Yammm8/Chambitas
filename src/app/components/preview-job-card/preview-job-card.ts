import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../services/post.service';

@Component({
  selector: 'app-preview-job-card',
  standalone: true,
  imports: [],
  templateUrl: './preview-job-card.html',
  styleUrl: './preview-job-card.css'
})
export class PreviewJobCard {
  @Input({ required: true }) job!: Post;

  private _router = inject(Router);

  goToJob(id: number) {
    this._router.navigateByUrl(`job-detail/${id}`);
  }
}
