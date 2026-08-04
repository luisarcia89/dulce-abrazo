import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../tipos/producto';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  private urlBase = 'http://localhost:3001/productos';

  constructor(private http: HttpClient) { }

  guardar(producto: Producto): Observable<any> {
    return this.http.post(`${this.urlBase}/Guardar`, producto);
  }

  listarTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlBase}/ListarTodos`);
  }
}