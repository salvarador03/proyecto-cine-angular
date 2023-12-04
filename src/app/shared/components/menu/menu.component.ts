import { Component } from '@angular/core'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/auth/pages/login/login.component';

@Component({
  selector: 'app-menu', 
  templateUrl: './menu.component.html' 
  
})
export class MenuComponent {
  // Inyectar NgbModal en el constructor para usarlo en el componente
  constructor(private modalService: NgbModal) {}

  // Método para abrir el modal, asegúrate de que es público si lo llamas desde la plantilla
  openLoginModal() {
    this.modalService.open(LoginComponent);
  }
}
