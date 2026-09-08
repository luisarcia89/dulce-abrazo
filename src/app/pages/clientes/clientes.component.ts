import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../servicios/peticion.service';
import { Cliente } from '../../tipos/cliente';

declare var $: any;
declare var Notiflix: any;

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  nuevoCliente: Cliente = {
    nombre: '',
    cedula: '',
    telefono: '',
    direccion: ''
  };

  editando: boolean = false;
  clienteAEliminar: Cliente | null = null;

  constructor(private peticionService: PeticionService) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.peticionService.listarClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Error al listar clientes', err);
        Notiflix.Notify.failure('No se pudieron cargar los clientes');
      }
    });
  }

  guardarCliente(): void {
    if (this.editando && this.nuevoCliente._id) {
      this.peticionService.actualizarCliente(this.nuevoCliente).subscribe({
        next: () => {
          Notiflix.Notify.success('Cliente actualizado con éxito');
          this.cargarClientes();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al actualizar cliente', err);
          Notiflix.Notify.failure('Error al actualizar el cliente');
        }
      });
    } else {
      this.peticionService.guardarCliente(this.nuevoCliente).subscribe({
        next: () => {
          Notiflix.Notify.success('Cliente guardado con éxito');
          this.cargarClientes();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al guardar cliente', err);
          Notiflix.Notify.failure('Error al guardar el cliente');
        }
      });
    }
  }

  editarCliente(cliente: Cliente): void {
    this.nuevoCliente = { ...cliente };
    this.editando = true;
  }

  abrirModalEliminar(cliente: Cliente): void {
    this.clienteAEliminar = cliente;
    $('#modalEliminar').modal('show');
  }

  confirmarEliminar(): void {
    if (!this.clienteAEliminar || !this.clienteAEliminar._id) return;

    this.peticionService.eliminarCliente(this.clienteAEliminar._id).subscribe({
      next: () => {
        Notiflix.Notify.success('Cliente eliminado con éxito');
        this.cargarClientes();
        this.clienteAEliminar = null;
        $('#modalEliminar').modal('hide');
      },
      error: (err) => {
        console.error('Error al eliminar cliente', err);
        Notiflix.Notify.failure('Error al eliminar el cliente');
      }
    });
  }

  limpiarFormulario(): void {
    this.nuevoCliente = {
      nombre: '',
      cedula: '',
      telefono: '',
      direccion: ''
    };
    this.editando = false;
  }
}