import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';
import { inject } from '@angular/core';

declare var $: any; // Para utilizar jQuery

export const autenticacionGuard: CanActivateFn = (route, state) => {

  // Router
  const router = inject(Router);

  // Servicio de autenticación  
  const autenticacionService = inject(AutenticacionService);

  // Devuelve si la sesión está iniciada
  return autenticacionService.isSesionIniciada()
  .pipe(    
    tap(autenticado => {
      if (!autenticado) {
        // Mostrar el modal si el usuario no está autenticado
        $('#loginModal').modal('show');

        // Redirige al usuario a la página de inicio de sesión
        router.navigate(['/auth/login']);
      }
    })
  );
};
