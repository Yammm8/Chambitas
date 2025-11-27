import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthService } from '../../services/auth.service';
import { userService } from '../../services/user.service';
import Swal from 'sweetalert2';

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
  constructor(public authService : AuthService, public userService: userService, private router: Router) {
    this.authService.isLoggedIn().subscribe(isAuth => {
  this.loggedIn = isAuth;
});

  }
  menuList: MenuItem[] = [
    { name: 'Home', route: '/home' },
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Perfil', route: '/profile' }
  ];
  cerrarSesion() {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.userService.clearUsuario();
        this.router.navigate(['/login']);

        Swal.fire({
          icon: 'success',
          title: 'Sesión cerrada',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      error: (err) => {
        console.error('Error al cerrar sesión', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al cerrar sesión',
          text: 'Por favor, inténtalo nuevamente.',
        });
      }
    });
  }

}
