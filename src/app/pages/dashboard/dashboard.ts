import { Component } from '@angular/core';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [DashboardCardComponent, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  posts: Post[] = [
    {
    id: 1,
    title: 'Desarrollador Frontend Angular',
    body: 'Se busca desarrollador con experiencia en Angular y Bootstrap 5.',
    status: true,
    user_id: 1,
    createdAt: '2025-10-19T10:00',
    pay: 5000.0,
    deadline: '2025-11-01',
    location: 'Monterrey, Nuevo León',
  },
    {
    id: 2,
    title: 'Desarrollador Frontend React',
    body: 'Se busca desarrollador con experiencia en react y tailwind 4.',
    status: true,
    user_id: 1,
    createdAt: '2025-10-19T10:00',
    pay: 5000.0,
    deadline: '2025-11-01',
    location: 'Monterrey, Nuevo León',
  },
  ];

}
