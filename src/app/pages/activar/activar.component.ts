import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';

declare var Notiflix: any;

@Component({
  selector: 'app-activar',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './activar.component.html',
  styleUrl: './activar.component.css'
})
export class ActivarComponent {

  datos = {
    email: '',
    codigo: ''
  };

  constructor(private peticionService: PeticionService) { }

  activar(): void {
    this.peticionService.activarCuenta(this.datos).subscribe({
      next: (respuesta) => {
        Notiflix.Notify.success(respuesta.mensaje);
        window.location.href = '/login';
      },
      error: (err) => {
        console.error('Error al activar cuenta', err);
        Notiflix.Notify.failure(err.error?.mensaje || 'Error al activar la cuenta');
      }
    });
  }
}