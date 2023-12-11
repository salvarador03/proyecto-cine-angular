import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor (
    private autenticacionService : AutenticacionService
  ) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // Obtiene el token JWT
    const token = this.autenticacionService.getJwtToken();

    // Define la petición
    let peticion : HttpRequest<any>;

    if(token != null) {

      // Si tengo token, tengo que añadir la cabecera
      peticion = request.clone({

        setHeaders: {
          Authorization: `Bearer ${token}`,
        },

      });        
    } else {

      // Si no hay token, la petición pasa inalterada
      peticion = request;
    }

    // Pasa la petición al siguiente manipulador
    return next.handle(peticion);
  }
}
