import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-paginador-numerico',
  templateUrl: './paginador-numerico.component.html'
})
export class PaginadorNumericoComponent {
  numeros: number[] = [];
  @Output() paginaSeleccionada = new EventEmitter<number>();

  constructor() { 
    for (let i = 1; i <= 10; i++) {
      this.numeros.push(i);
    }
  }

  seleccionarPagina(numero: number) {
    this.paginaSeleccionada.emit(numero);
  }

  ngOnInit(): void {
  }
}

