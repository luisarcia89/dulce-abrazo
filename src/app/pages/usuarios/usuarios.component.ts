import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../servicios/peticion.service';
import { Usuario } from '../../tipos/usuario';

declare var $: any;
declare var Notiflix: any;

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  nuevoUsuario: Usuario = {
    nombre: '',
    email: '',
    password: '',
    nombrerol: 'Cliente',
    estado: true
  };

  editando: boolean = false;
  usuarioAEliminar: Usuario | null = null;

  constructor(private peticionService: PeticionService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.peticionService.listarUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al listar usuarios', err);
        Notiflix.Notify.failure('No se pudieron cargar los usuarios');
      }
    });
  }

  guardarUsuario(): void {
    if (this.editando && this.nuevoUsuario._id) {
      this.peticionService.actualizarUsuario(this.nuevoUsuario).subscribe({
        next: () => {
          Notiflix.Notify.success('Usuario actualizado con éxito');
          this.cargarUsuarios();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al actualizar usuario', err);
          Notiflix.Notify.failure('Error al actualizar el usuario');
        }
      });
    } else {
      this.peticionService.guardarUsuario(this.nuevoUsuario).subscribe({
        next: () => {
          Notiflix.Notify.success('Usuario guardado con éxito');
          this.cargarUsuarios();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al guardar usuario', err);
          Notiflix.Notify.failure(err.error?.mensaje || 'Error al guardar el usuario');
        }
      });
    }
  }

  editarUsuario(usuario: Usuario): void {
    this.nuevoUsuario = { ...usuario, password: '' };
    this.editando = true;
  }

  abrirModalEliminar(usuario: Usuario): void {
    this.usuarioAEliminar = usuario;
    $('#modalEliminarUsuario').modal('show');
  }

  confirmarEliminar(): void {
    if (!this.usuarioAEliminar || !this.usuarioAEliminar._id) return;

    this.peticionService.eliminarUsuario(this.usuarioAEliminar._id).subscribe({
      next: () => {
        Notiflix.Notify.success('Usuario eliminado con éxito');
        this.cargarUsuarios();
        this.usuarioAEliminar = null;
        $('#modalEliminarUsuario').modal('hide');
      },
      error: (err) => {
        console.error('Error al eliminar usuario', err);
        Notiflix.Notify.failure('Error al eliminar el usuario');
      }
    });
  }

  limpiarFormulario(): void {
    this.nuevoUsuario = {
      nombre: '',
      email: '',
      password: '',
      nombrerol: 'Cliente',
      estado: true
    };
    this.editando = false;
  }
}