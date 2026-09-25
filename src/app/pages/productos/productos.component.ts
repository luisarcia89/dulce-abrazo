import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../servicios/peticion.service';
import { Producto } from '../../tipos/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  esAdministrador: boolean = false;

  nuevoProducto: Producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    cantidadStock: 0
  };

  constructor(private peticionService: PeticionService) { }

  ngOnInit(): void {
    this.verificarSesion();
    this.cargarProductos();
  }

  verificarSesion(): void {
    this.peticionService.estadoSesion().subscribe({
      next: (respuesta) => {
        this.esAdministrador = respuesta.logueado && respuesta.nombrerol === 'Administrador';
      },
      error: (err) => {
        console.error('Error al verificar sesión', err);
        this.esAdministrador = false;
      }
    });
  }

  cargarProductos(): void {
    this.peticionService.listarTodos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al listar productos', err);
      }
    });
  }

  guardarProducto(): void {
    this.peticionService.guardar(this.nuevoProducto).subscribe({
      next: (respuesta) => {
        console.log('Producto guardado', respuesta);
        this.cargarProductos();
        this.limpiarFormulario();
      },
      error: (err) => {
        console.error('Error al guardar producto', err);
      }
    });
  }

  limpiarFormulario(): void {
    this.nuevoProducto = {
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: '',
      cantidadStock: 0
    };
  }
}