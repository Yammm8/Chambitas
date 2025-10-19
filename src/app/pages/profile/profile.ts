import { Component, OnInit } from '@angular/core';
import { ProfileSelectorComponent } from "../../components/profile-selector/profile-selector";
import { UserDetail, User } from '../../services/user';


@Component({
  selector: 'app-profile',
  imports: [ProfileSelectorComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit{
  Editar : boolean = false;
  usuario !: UserDetail;

  constructor(private userService: User){}

  ngOnInit(){
    this.usuario = this.userService.getUsuario();
  }

  EditarPerfil(){
    this.Editar = !this.Editar;
  }
}
