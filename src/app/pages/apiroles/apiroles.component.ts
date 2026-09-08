import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../servicios/peticion.service';
import { ApiRoles } from '../../tipos/apiroles';
import { Roles } from '../../tipos/roles';
import { Apis } from '../../tipos/apis';

declare var $: any;
declare var Notiflix: any;

@Component({
  selector: 'app-apiroles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './apiroles.component.html',
  styleUrl: './apiroles.component.css'
})
export class ApirolesComponent implements OnInit {

  apiroles: ApiRoles[] = [];
  roles: Roles[] = [];
  apis: Apis[] = [];

  nuevoApiRol: ApiRoles = {
    path: '',
    metodo: '',
    nombrerol: '',
    permiso: ''
  };

  editando: boolean = false;
  apiRolAEliminar: ApiRoles | null = null;

  constructor(private peticionService: PeticionService) { }

  ngOnInit(): void {
    this.cargarRoles();
    this.cargarApis();
    this.cargarApiRoles();
  }

  cargarRoles(): void {
    this.peticionService.listarRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => {
        console.error('Error al listar roles', err);
      }
    });
  }

  cargarApis(): void {
    this.peticionService.listarApis().subscribe({
      next: (data) => {
        this.apis = data;
      },
      error: (err) => {
        console.error('Error al listar apis', err);
      }
    });
  }

  cargarApiRoles(): void {
    this.peticionService.listarApiRoles().subscribe({
      next: (data) => {
        this.apiroles = data;
      },
      error: (err) => {
        console.error('Error al listar permisos', err);
        Notiflix.Notify.failure('No se pudieron cargar los permisos');
      }
    });
  }

  seleccionarApi(): void {
    const apiSeleccionada = this.apis.find(a => a.path === this.nuevoApiRol.path);
    if (apiSeleccionada) {
      this.nuevoApiRol.metodo = apiSeleccionada.metodo;
    }
  }

  guardarApiRol(): void {
    if (this.editando && this.nuevoApiRol._id) {
      this.peticionService.actualizarApiRol(this.nuevoApiRol).subscribe({
        next: () => {
          Notiflix.Notify.success('Permiso actualizado con éxito');
          this.cargarApiRoles();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al actualizar permiso', err);
          Notiflix.Notify.failure('Error al actualizar el permiso');
        }
      });
    } else {
      this.peticionService.guardarApiRol(this.nuevoApiRol).subscribe({
        next: () => {
          Notiflix.Notify.success('Permiso guardado con éxito');
          this.cargarApiRoles();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al guardar permiso', err);
          Notiflix.Notify.failure('Error al guardar el permiso');
        }
      });
    }
  }

  editarApiRol(apirol: ApiRoles): void {
    this.nuevoApiRol = { ...apirol };
    this.editando = true;
  }

  abrirModalEliminar(apirol: ApiRoles): void {
    this.apiRolAEliminar = apirol;
    $('#modalEliminarApiRol').modal('show');
  }

  confirmarEliminar(): void {
    if (!this.apiRolAEliminar || !this.apiRolAEliminar._id) return;

    this.peticionService.eliminarApiRol(this.apiRolAEliminar._id).subscribe({
      next: () => {
        Notiflix.Notify.success('Permiso eliminado con éxito');
        this.cargarApiRoles();
        this.apiRolAEliminar = null;
        $('#modalEliminarApiRol').modal('hide');
      },
      error: (err) => {
        console.error('Error al eliminar permiso', err);
        Notiflix.Notify.failure('Error al eliminar el permiso');
      }
    });
  }

  limpiarFormulario(): void {
    this.nuevoApiRol = {
      path: '',
      metodo: '',
      nombrerol: '',
      permiso: ''
    };
    this.editando = false;
  }
}