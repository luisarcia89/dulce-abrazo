import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../servicios/peticion.service';
import { Apis } from '../../tipos/apis';

declare var $: any;
declare var Notiflix: any;

@Component({
  selector: 'app-apis',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './apis.component.html',
  styleUrl: './apis.component.css'
})
export class ApisComponent implements OnInit {

  apis: Apis[] = [];

  nuevaApi: Apis = {
    path: '',
    metodo: '',
    descripcion: ''
  };

  editando: boolean = false;
  apiAEliminar: Apis | null = null;

  constructor(private peticionService: PeticionService) { }

  ngOnInit(): void {
    this.cargarApis();
  }

  cargarApis(): void {
    this.peticionService.listarApis().subscribe({
      next: (data) => {
        this.apis = data;
      },
      error: (err) => {
        console.error('Error al listar apis', err);
        Notiflix.Notify.failure('No se pudieron cargar las apis');
      }
    });
  }

  guardarApi(): void {
    if (this.editando && this.nuevaApi._id) {
      this.peticionService.actualizarApi(this.nuevaApi).subscribe({
        next: () => {
          Notiflix.Notify.success('Api actualizada con éxito');
          this.cargarApis();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al actualizar api', err);
          Notiflix.Notify.failure('Error al actualizar la api');
        }
      });
    } else {
      this.peticionService.guardarApi(this.nuevaApi).subscribe({
        next: () => {
          Notiflix.Notify.success('Api guardada con éxito');
          this.cargarApis();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al guardar api', err);
          Notiflix.Notify.failure('Error al guardar la api');
        }
      });
    }
  }

  editarApi(api: Apis): void {
    this.nuevaApi = { ...api };
    this.editando = true;
  }

  abrirModalEliminar(api: Apis): void {
    this.apiAEliminar = api;
    $('#modalEliminarApi').modal('show');
  }

  confirmarEliminar(): void {
    if (!this.apiAEliminar || !this.apiAEliminar._id) return;

    this.peticionService.eliminarApi(this.apiAEliminar._id).subscribe({
      next: () => {
        Notiflix.Notify.success('Api eliminada con éxito');
        this.cargarApis();
        this.apiAEliminar = null;
        $('#modalEliminarApi').modal('hide');
      },
      error: (err) => {
        console.error('Error al eliminar api', err);
        Notiflix.Notify.failure('Error al eliminar la api');
      }
    });
  }

  limpiarFormulario(): void {
    this.nuevaApi = {
      path: '',
      metodo: '',
      descripcion: ''
    };
    this.editando = false;
  }
}