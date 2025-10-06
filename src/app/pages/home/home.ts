import { Component } from '@angular/core';
import { PreviewJobCard } from "../../components/preview-job-card/preview-job-card";

@Component({
  selector: 'app-home',
  imports: [PreviewJobCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
