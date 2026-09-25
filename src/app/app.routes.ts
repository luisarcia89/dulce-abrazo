import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MisionComponent } from './pages/mision/mision.component';
import { VisionComponent } from './pages/vision/vision.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RolesComponent } from './pages/roles/roles.component';
import { ApisComponent } from './pages/apis/apis.component';
import { ApirolesComponent } from './pages/apiroles/apiroles.component';
import { ActivarComponent } from './pages/activar/activar.component';
import { OlvidePasswordComponent } from './pages/olvide-password/olvide-password.component';
import { RestablecerPasswordComponent } from './pages/restablecer-password/restablecer-password.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mision', component: MisionComponent },
  { path: 'vision', component: VisionComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'activar', component: ActivarComponent },
  { path: 'olvide-password', component: OlvidePasswordComponent },
  { path: 'restablecer-password', component: RestablecerPasswordComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'roles', component: RolesComponent },
      { path: 'apis', component: ApisComponent },
      { path: 'apiroles', component: ApirolesComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'usuarios', component: UsuariosComponent },
    ]
  },
];