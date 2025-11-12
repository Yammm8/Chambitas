import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthService } from '../../services/auth.service';

interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  loggedIn: boolean = false;
  constructor(public authService : AuthService) {
    this.loggedIn= this.authService.isLoggedIn()
  }
  menuList: MenuItem[] = [
    { name: 'Home', route: '/home' },
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Perfil', route: '/profile' }
  ];
  
}
