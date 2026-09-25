import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';

declare var Notiflix: any;

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  nombre: string = '';
  email: string = '';
  nombrerol: string = '';

  datosPassword = {
    passwordActual: '',
    passwordNueva: '',
    confirmarPassword: ''
  };

  constructor(private peticionService: PeticionService) { }

  ngOnInit(): void {
    this.cargarMisDatos();
  }

  cargarMisDatos(): void {
    this.peticionService.misDatos().subscribe({
      next: (respuesta) => {
        this.nombre = respuesta.nombre;
        this.email = respuesta.email;
        this.nombrerol = respuesta.nombrerol;
      },
      error: (err) => {
        console.error('Error al cargar los datos', err);
      }
    });
  }

  cambiarPassword(): void {
    if (this.datosPassword.passwordNueva !== this.datosPassword.confirmarPassword) {
      Notiflix.Notify.failure('Las contraseñas nuevas no coinciden');
      return;
    }

    this.peticionService.cambiarPassword({
      passwordActual: this.datosPassword.passwordActual,
      passwordNueva: this.datosPassword.passwordNueva
    }).subscribe({
      next: (respuesta) => {
        Notiflix.Notify.success(respuesta.mensaje);
        this.datosPassword = { passwordActual: '', passwordNueva: '', confirmarPassword: '' };
      },
      error: (err) => {
        console.error('Error al cambiar contraseña', err);
        Notiflix.Notify.failure(err.error?.mensaje || 'Error al cambiar la contraseña');
      }
    });
  }
}