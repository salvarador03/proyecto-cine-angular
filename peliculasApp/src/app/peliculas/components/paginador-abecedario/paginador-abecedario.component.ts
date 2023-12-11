import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-paginador-abecedario',
  templateUrl: './paginador-abecedario.component.html'
})
export class PaginadorAbecedarioComponent{
  @Output() letraSeleccionada = new EventEmitter<string>();

  abecedario: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  constructor() { }

  ngOnInit(): void {
  }
  seleccionarLetra(event: Event, letra: string) {
    event.preventDefault(); // Para evitar la recarga de la página
    this.letraSeleccionada.emit(letra);
  }
}
