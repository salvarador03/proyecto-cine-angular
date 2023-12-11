import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula.interface';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabla-peliculas',
  templateUrl: './tabla-peliculas.component.html'
})
export class TablaPeliculasComponent {

  /**
   * Esto es el array de tareas que se va a renderizar
   */
  @Input() peliculas: Pelicula[] = [];

  /**
   * Evento que se va a emitir desde este componente cuando se quiera 
   * borrar une tarea
   */
  @Output() onBorrar: EventEmitter<number> = new EventEmitter();

  constructor
  (
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  /**
   * Para borrar pelicula se pasa el índice dentro de la tabla de peliculas.
   * Más que nada porque luego se evita tener que recorrer la tabla para hacer la eliminación
   * 
   * @param indice 
   */
  borrarPelicula(indice: number): void {
    this.onBorrar.emit(indice);
  }
  
  verPelicula(id: number): void {
    // Asegúrate de que estás navegando a la ruta correcta
    this.router.navigate([id], { relativeTo: this.activatedRoute });
  } 
}
