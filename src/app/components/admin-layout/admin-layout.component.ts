import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../servicios/peticion.service';

declare var Notiflix: any;

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit {

  nombreUsuario: string = '';
  nombrerol: string = '';

  constructor(
    private peticionService: PeticionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.peticionService.estadoSesion().subscribe({
      next: (respuesta) => {
        this.nombreUsuario = respuesta.nombre || '';
        this.nombrerol = respuesta.nombrerol || '';
      },
      error: (err) => {
        console.error('Error al verificar sesión', err);
      }
    });
  }

  cerrarSesion(): void {
    this.peticionService.logout().subscribe({
      next: () => {
        Notiflix.Notify.success('Sesión cerrada correctamente');
        window.location.href = '/';
      },
      error: (err) => {
        console.error('Error al cerrar sesión', err);
      }
    });
  }
}