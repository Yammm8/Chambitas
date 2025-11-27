import { Component, OnInit } from '@angular/core';
import { ProfileSelectorComponent } from "../../components/profile-selector/profile-selector";
import { UserDetail, userService } from '../../services/user.service';


@Component({
  selector: 'app-profile',
  imports: [ProfileSelectorComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit{
  Editar : boolean = false;
  usuario: User | null = null;


  constructor(private userService: userService){}

  ngOnInit(){
    this.usuario = this.userService.getUsuario();
  }

  EditarPerfil(){
    this.Editar = !this.Editar;
  }
}
