import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../tipos/producto';
import { Cliente } from '../tipos/cliente';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  private urlProductos = 'http://localhost:3001/productos';
  private urlClientes = 'http://localhost:3001/clientes';

  constructor(private http: HttpClient) { }



  guardar(producto: Producto): Observable<any> {
    return this.http.post(`${this.urlProductos}/Guardar`, producto);
  }

  listarTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlProductos}/ListarTodos`);
  }

 

  guardarCliente(cliente: Cliente): Observable<any> {
    return this.http.post(`${this.urlClientes}/Guardar`, cliente);
  }

  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.urlClientes}/ListarTodos`);
  }

  actualizarCliente(id: string, cliente: Cliente): Observable<any> {
    return this.http.put(`${this.urlClientes}/Actualizar/${id}`, cliente);
  }

  eliminarCliente(id: string): Observable<any> {
    return this.http.delete(`${this.urlClientes}/Eliminar/${id}`);
  }
}