import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';

declare var Notiflix: any;

@Component({
  selector: 'app-olvide-password',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './olvide-password.component.html',
  styleUrl: './olvide-password.component.css'
})
export class OlvidePasswordComponent {

  email: string = '';

  constructor(
    private peticionService: PeticionService,
    private router: Router
  ) { }

  solicitarCodigo(): void {
    this.peticionService.solicitarCodigoRecuperacion({ email: this.email }).subscribe({
      next: (respuesta) => {
        Notiflix.Notify.success(respuesta.mensaje);
        this.router.navigate(['/restablecer-password'], { queryParams: { email: this.email } });
      },
      error: (err) => {
        console.error('Error al solicitar código', err);
        Notiflix.Notify.failure(err.error?.mensaje || 'Error al solicitar el código');
      }
    });
  }
}