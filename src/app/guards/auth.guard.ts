import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PeticionService } from '../servicios/peticion.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const peticionService = inject(PeticionService);
  const router = inject(Router);

  return peticionService.estadoSesion().pipe(
    map((respuesta) => {
      if (respuesta.logueado) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};