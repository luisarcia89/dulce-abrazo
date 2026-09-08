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
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mision', component: MisionComponent },
  { path: 'vision', component: VisionComponent },
  { path: 'productos', component: ProductosComponent, canActivate: [authGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
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
    ]
  },
];