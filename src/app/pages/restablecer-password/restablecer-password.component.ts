import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';

declare var Notiflix: any;

@Component({
  selector: 'app-restablecer-password',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './restablecer-password.component.html',
  styleUrl: './restablecer-password.component.css'
})
export class RestablecerPasswordComponent implements OnInit {

  datos = {
    email: '',
    codigo: '',
    password: ''
  };

  constructor(
    private peticionService: PeticionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.datos.email = params['email'] || '';
    });
  }

  restablecer(): void {
    this.peticionService.recuperarPassword(this.datos).subscribe({
      next: (respuesta) => {
        Notiflix.Notify.success(respuesta.mensaje);
        window.location.href = '/login';
      },
      error: (err) => {
        console.error('Error al restablecer contraseña', err);
        Notiflix.Notify.failure(err.error?.mensaje || 'Error al restablecer la contraseña');
      }
    });
  }
}