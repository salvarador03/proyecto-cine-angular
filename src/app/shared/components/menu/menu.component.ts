import { Component } from '@angular/core'; // Asegúrate de importar Component
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/auth/pages/login/login.component';

@Component({
  selector: 'app-menu', // El selector debe coincidir con el usado en el HTML
  templateUrl: './menu.component.html' // Asegúrate de que la ruta es correcta
  // styleUrls: ['./menu.component.css'] // Descomenta y usa esto si tienes estilos específicos
})
export class MenuComponent {
  // Inyectar NgbModal en el constructor para usarlo en el componente
  constructor(private modalService: NgbModal) {}

  // Método para abrir el modal, asegúrate de que es público si lo llamas desde la plantilla
  openLoginModal() {
    const modalRef = this.modalService.open(LoginComponent);
    // Puedes pasar datos al modal si es necesario
    modalRef.componentInstance.name = 'World';
  }
}
