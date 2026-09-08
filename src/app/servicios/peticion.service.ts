import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../tipos/producto';
import { Cliente } from '../tipos/cliente';
import { Roles } from '../tipos/roles';
import { Apis } from '../tipos/apis';
import { ApiRoles } from '../tipos/apiroles';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  private urlProductos = 'http://localhost:3001/productos';
  private urlClientes = 'http://localhost:3001/clientes';
  private urlUsuarios = 'http://localhost:3001/usuarios';
  private urlRoles = 'http://localhost:3001/roles';
  private urlApis = 'http://localhost:3001/apis';
  private urlApiRoles = 'http://localhost:3001/apiroles';

  constructor(private http: HttpClient) { }



  guardar(producto: Producto): Observable<any> {
    return this.http.post(`${this.urlProductos}/Guardar`, producto, { withCredentials: true });
  }

  listarTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlProductos}/ListarTodos`, { withCredentials: true });
  }



  guardarCliente(cliente: Cliente): Observable<any> {
    return this.http.post(`${this.urlClientes}/Guardar`, cliente, { withCredentials: true });
  }

  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.urlClientes}/ListarTodos`, { withCredentials: true });
  }

  actualizarCliente(cliente: Cliente): Observable<any> {
    return this.http.put(`${this.urlClientes}/Actualizar`, cliente, { withCredentials: true });
  }

  eliminarCliente(id: string): Observable<any> {
    return this.http.delete(`${this.urlClientes}/Eliminar`, { body: { _id: id }, withCredentials: true });
  }



  registrarUsuario(usuario: { nombre: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.urlUsuarios}/Registrar`, usuario, { withCredentials: true });
  }

  login(credenciales: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.urlUsuarios}/Login`, credenciales, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.urlUsuarios}/Logout`, {}, { withCredentials: true });
  }

  estadoSesion(): Observable<any> {
    return this.http.get(`${this.urlUsuarios}/Estado`, { withCredentials: true });
  }



  guardarRol(rol: Roles): Observable<any> {
    return this.http.post(`${this.urlRoles}/Guardar`, rol, { withCredentials: true });
  }

  listarRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.urlRoles}/CargarTodos`, { withCredentials: true });
  }

  actualizarRol(rol: Roles): Observable<any> {
    return this.http.put(`${this.urlRoles}/Actualizar`, rol, { withCredentials: true });
  }

  eliminarRol(id: string): Observable<any> {
    return this.http.delete(`${this.urlRoles}/Eliminar`, { body: { _id: id }, withCredentials: true });
  }



  guardarApi(api: Apis): Observable<any> {
    return this.http.post(`${this.urlApis}/Guardar`, api, { withCredentials: true });
  }

  listarApis(): Observable<Apis[]> {
    return this.http.get<Apis[]>(`${this.urlApis}/CargarTodos`, { withCredentials: true });
  }

  actualizarApi(api: Apis): Observable<any> {
    return this.http.put(`${this.urlApis}/Actualizar`, api, { withCredentials: true });
  }

  eliminarApi(id: string): Observable<any> {
    return this.http.delete(`${this.urlApis}/Eliminar`, { body: { _id: id }, withCredentials: true });
  }



  guardarApiRol(apirol: ApiRoles): Observable<any> {
    return this.http.post(`${this.urlApiRoles}/Guardar`, apirol, { withCredentials: true });
  }

  listarApiRoles(): Observable<ApiRoles[]> {
    return this.http.get<ApiRoles[]>(`${this.urlApiRoles}/CargarTodos`, { withCredentials: true });
  }

  actualizarApiRol(apirol: ApiRoles): Observable<any> {
    return this.http.put(`${this.urlApiRoles}/Actualizar`, apirol, { withCredentials: true });
  }

  eliminarApiRol(id: string): Observable<any> {
    return this.http.delete(`${this.urlApiRoles}/Eliminar`, { body: { _id: id }, withCredentials: true });
  }
}