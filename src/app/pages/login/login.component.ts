import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';

declare var Notiflix: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credenciales = {
    email: '',
    password: ''
  };

  constructor(
    private peticionService: PeticionService
  ) { }

  iniciarSesion(): void {
    this.peticionService.login(this.credenciales).subscribe({
      next: (respuesta) => {
        Notiflix.Notify.success('Bienvenido, ' + respuesta.usuario.nombre);
        window.location.href = '/productos';
      },
      error: (err) => {
        console.error('Error al iniciar sesión', err);
        Notiflix.Notify.failure(err.error?.mensaje || 'Error al iniciar sesión');
      }
    });
  }
}