import { Component } from '@angular/core';
import { ProfileSelectorComponent } from "../../components/profile-selector/profile-selector";


@Component({
  selector: 'app-profile',
  imports: [ProfileSelectorComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  Editar : boolean = false;
  EditarPerfil(){
    this.Editar = !this.Editar;
  }
}
