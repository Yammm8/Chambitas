import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  menuList: MenuItem[] = [
    { name: 'Home', route: '/home' },
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Perfil', route: '/profile' }
  ];
}
