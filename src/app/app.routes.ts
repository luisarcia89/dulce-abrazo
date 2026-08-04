import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MisionComponent } from './pages/mision/mision.component';
import { VisionComponent } from './pages/vision/vision.component';
import { ProductosComponent } from './pages/productos/productos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mision', component: MisionComponent },
  { path: 'vision', component: VisionComponent },
  { path: 'productos', component: ProductosComponent },
];