import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';

declare var Notiflix: any;

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  nuevoUsuario = {
    nombre: '',
    email: '',
    password: ''
  };

  constructor(
    private peticionService: PeticionService,
    private router: Router
  ) { }

  registrar(): void {
    this.peticionService.registrarUsuario(this.nuevoUsuario).subscribe({
      next: () => {
        Notiflix.Notify.success('Usuario registrado con éxito. Revisa tu correo para activar la cuenta');
        this.router.navigate(['/activar']);
      },
      error: (err) => {
        console.error('Error al registrar usuario', err);
        Notiflix.Notify.failure(err.error?.mensaje || 'Error al registrar usuario');
      }
    });
  }
}