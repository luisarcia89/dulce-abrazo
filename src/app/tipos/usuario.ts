export interface Usuario {
  _id?: string;
  nombre: string;
  email: string;
  password?: string;
  nombrerol: string;
  estado: boolean;
  activo?: boolean;
}