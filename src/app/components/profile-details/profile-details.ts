import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { userService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProfileDetailsForm } from '../../services/user.service';

@Component({
  selector: 'app-profile-details',
  imports: [FormsModule],
  templateUrl: './profile-details.html',
  styleUrl: './profile-details.css'
})
export class ProfileDetails {

  usuario: any = null;

  formData = {
    gender: '',
    birthday: '',
    description: '',
  };

  constructor(private userService: userService, private router: Router) {}

  ngOnInit() {
    this.usuario = this.userService.getUsuario();

    if (this.usuario) {
      this.formData = {
        gender: this.usuario.gender || '',
        birthday: this.usuario.birthday || '',
        description: this.usuario.description || '',
      };
    }
  }

  isFormValid() {
    return (
      this.formData.gender.trim() !== '' &&
      this.formData.birthday.trim() !== '' &&
      this.formData.description.trim() !== ''
    );
  }

  onSubmit() {

    if (!this.isFormValid()) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor llena todos los campos.',
        icon: 'warning'
      });
      return;
    }

    const payload: ProfileDetailsForm = {
      gender: this.formData.gender.trim(),
      birthday: this.formData.birthday.trim(),
      description: this.formData.description.trim(),
    };

    this.userService.updateProfileDetails(payload).subscribe({
      next: (resp) => {
        Swal.fire({
          title: '¡Datos actualizados!',
          text: resp, // texto que viene del backend
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(['/profile']);
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: err.error || 'Hubo un problema al actualizar.',
          icon: 'error',
        });
        console.error("Error al actualizar", err);
      },
    });
  }
}
