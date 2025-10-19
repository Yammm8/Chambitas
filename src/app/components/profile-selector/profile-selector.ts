import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileContact } from '../profile-contact/profile-contact';
import { ProfileDetails } from '../profile-details/profile-details';
import { ProfilePersonal } from '../profile-personal/profile-personal';
import { ContactDetail, User } from '../../services/user';

@Component({
  selector: 'app-profile-selector',
  imports: [ProfileContact, ProfileDetails, ProfilePersonal],
  template: `
  <div class="container d-flex justify-content-center gap-3 p-1" style="background-color: lightgrey; border-radius: 20px;">
  <button class="btn flex-fill gap-3" (click)="verFormPersonal()">
    <i class="bi bi-person-lines-fill"></i>
    Personal
  </button>
  <button class="btn flex-fill" (click)="verFormDetalles()">
    <i class="bi bi-person-square"></i>
    Perfil
  </button>
  <button class="btn flex-fill gap-3" (click)="verFormContacto()">
    <i class="bi bi-telephone-plus-fill"></i>
    Contacto
  </button>
</div>
<br>

@if (verInfoPersonal) {
  <app-profile-personal></app-profile-personal>
}
@if (verInfoDetalles) {
  <app-profile-details></app-profile-details>
}
@if (verInfoContacto) {
  <app-profile-contact [contacts]="contacts"></app-profile-contact>
}

  `,
  styles: `
    :host {
      display: block;
    }
    button{
      border-radius: 20px;
      transition: transform 0.1s ease, background-color 0.1s ease;
    }
    button:hover {
      background-color: #efefefff;
    }
    button:active{
      background-color: #efefefff;
      color: #ffffff;
      transform: scale(0.97);
    }
    button.active {
    background-color: #007bff;
    color: white;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSelectorComponent { 

  contacts: ContactDetail[] = [];

  constructor(private userService: User) {}

  ngOnInit() {
    const user = this.userService.getUsuario();
    this.contacts = user.contacts || [];
  }
  

  verInfoPersonal: boolean = true;
  verInfoDetalles: boolean = false;
  verInfoContacto: boolean = false;
  verFormPersonal() {
    this.verInfoPersonal = true;
    this.verInfoDetalles = false;
    this.verInfoContacto = false;
  }
  verFormDetalles() {
    this.verInfoDetalles = true;
    this.verInfoPersonal = false;
    this.verInfoContacto = false;
  }
  verFormContacto() {
    this.verInfoContacto = true;
    this.verInfoPersonal = false;
    this.verInfoDetalles = false;
  }
}
