import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AutenticacionService } from 'src/app/auth/services/autenticacion.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  
  @Output() onCerrarSesion : EventEmitter<any> = new EventEmitter();

  constructor(private autenticacionService: AutenticacionService) {}

  cerrarSesion() {
    // Genera evento de cerrar sesión
    this.onCerrarSesion.emit();
    this.autenticacionService.cerrarSesion();
  }
  public estaSesionIniciada(): Observable<boolean> {
    return this.autenticacionService.isSesionIniciada();
  }
}
