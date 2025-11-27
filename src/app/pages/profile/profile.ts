import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProfileSelectorComponent } from "../../components/profile-selector/profile-selector";
import { userService, ContactBackend, UserDetail } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [ProfileSelectorComponent, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  Editar: boolean = false;
  usuario: User| null = null;
  contacts: ContactBackend[] = [];

  contactMeans = [
    { id: 1, type: "Email" },
    { id: 2, type: "Celular" },
    { id: 3, type: "Facebook" },
    { id: 4, type: "Instagram" },
    { id: 5, type: "LinkedIn" },
  ];

  constructor(private userService: userService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.userService.usuario$.subscribe(u => {
      this.usuario = u;
      this.cdr.markForCheck();
    });

    this.userService.getContacts().subscribe({
      next: (data: ContactBackend[]) => {
        this.contacts = data;
        this.cdr.markForCheck();
      },
      error: err => {
        console.error("Error al obtener contactos:", err);
      }
    });
  }

  EditarPerfil() {
    this.Editar = !this.Editar;
  }

  getContactType(id: number): string {
    return this.contactMeans.find(m => m.id === id)?.type || "Desconocido";
  }
}
