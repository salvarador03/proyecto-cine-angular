import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest, LoginResponse } from '../interfaces/auth.interface';
import Swal from 'sweetalert2';
declare var $: any; // Para utilizar jquery

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  // URL Inicio de sesión
  private loginUrl : string = `${environment.peliculasBackendBaseUrl}/login`;

  // Token JWT que nos devuelve el servidor al iniciar sesión
  private jwtToken : string | null = null;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  iniciarSesion(login: string, pass: string) : Observable<boolean> {

    // Crea el objeto que contiene las credenciales
    const credenciales : LoginRequest = {
      email: login,
      password: pass
    }

    // Retorna un observable
    return this.httpClient.post<LoginResponse>(this.loginUrl, credenciales)
    .pipe(
        map((response) => {

          // Toma el token JWT y lo almacena
          this.jwtToken = response.accessToken;
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            showConfirmButton: false,
            timer: 1000
          });
          $('#loginModal').modal('hide');

          // Si estoy en este punto, devuelvo true.
          // Si hay error de autenticación lo debe gestionar el
          // cliente
          return true;
        })
    );
  }
  cerrarSesion(): void {
    // Limpiar el token JWT
    this.jwtToken = null;
        // Muestra mensaje de cerrado de sesión con SweetAlert
        Swal.fire({
          icon: 'info',
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión exitosamente',
          showConfirmButton: false,
          timer: 2000
      }).then((result) => {
        // Redirige a la página principal una vez que se cierra el SweetAlert
        this.router.navigate(['/auth/login']);
    });

  }

  isSesionIniciada(): Observable<boolean> { // | boolean {

    // Si tengo el usuario inicializado es que tengo sesión
    // retorno un true
    if(this.jwtToken) {
      return of(true);
    } else {
      return of(false);
    }
  }  

  getJwtToken(): string | null {
    return this.jwtToken;
  }
}
