import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../servicios/peticion.service';
import { Roles } from '../../tipos/roles';

declare var $: any;
declare var Notiflix: any;

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {

  roles: Roles[] = [];

  nuevoRol: Roles = {
    nombrerol: ''
  };

  editando: boolean = false;
  rolAEliminar: Roles | null = null;

  constructor(private peticionService: PeticionService) { }

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles(): void {
    this.peticionService.listarRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => {
        console.error('Error al listar roles', err);
        Notiflix.Notify.failure('No se pudieron cargar los roles');
      }
    });
  }

  guardarRol(): void {
    if (this.editando && this.nuevoRol._id) {
      this.peticionService.actualizarRol(this.nuevoRol).subscribe({
        next: () => {
          Notiflix.Notify.success('Rol actualizado con éxito');
          this.cargarRoles();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al actualizar rol', err);
          Notiflix.Notify.failure('Error al actualizar el rol');
        }
      });
    } else {
      this.peticionService.guardarRol(this.nuevoRol).subscribe({
        next: () => {
          Notiflix.Notify.success('Rol guardado con éxito');
          this.cargarRoles();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al guardar rol', err);
          Notiflix.Notify.failure('Error al guardar el rol');
        }
      });
    }
  }

  editarRol(rol: Roles): void {
    this.nuevoRol = { ...rol };
    this.editando = true;
  }

  abrirModalEliminar(rol: Roles): void {
    this.rolAEliminar = rol;
    $('#modalEliminarRol').modal('show');
  }

  confirmarEliminar(): void {
    if (!this.rolAEliminar || !this.rolAEliminar._id) return;

    this.peticionService.eliminarRol(this.rolAEliminar._id).subscribe({
      next: () => {
        Notiflix.Notify.success('Rol eliminado con éxito');
        this.cargarRoles();
        this.rolAEliminar = null;
        $('#modalEliminarRol').modal('hide');
      },
      error: (err) => {
        console.error('Error al eliminar rol', err);
        Notiflix.Notify.failure('Error al eliminar el rol');
      }
    });
  }

  limpiarFormulario(): void {
    this.nuevoRol = {
      nombrerol: ''
    };
    this.editando = false;
  }
}