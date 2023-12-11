import { Component } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula.interface';
import { PeliculasService } from '../../services/peliculas.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent {
  // Lista de peliculas representados en la tabla
  peliculas: Pelicula[] = [];  

  //------------------------------------------------------------------
  // Inicialización
  //------------------------------------------------------------------
  constructor(
    private peliculasService: PeliculasService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    // Carga la lista de peliculas
    this.cargarPeliculas();
  }

  //------------------------------------------------------------------
  // Gestores de eventos
  //------------------------------------------------------------------

  /**
    *  Método a invocar para lanzar la búsqueda 
    */   
  buscar(termino: string): void {
    
    // Aquí se hace la búsqueda por el término de búsqueda
    this.cargarPeliculas(termino);
  }

  /**
   * Borrar tarea recibe el evento. El evento de la tabla de peliculas emite el ID en la tabla
   * 
   * @param indice 
   */
  borrarPelicula(indice: number) {

    // Obtiene la tarea a eliminar
    const pelicula = this.peliculas[indice];
  
    // Si el usuario me confirma que quiere eliminar la tarea, la elimina
    this.dialogService.solicitarConfirmacion(`¿Está seguro de que quiere eliminar la pelicula: ${pelicula.titulo}?`, 'Atención',
      () => {

        // Elimina la tarea
        this.peliculasService.borrarPelicula(pelicula).subscribe((peliculaEliminada) => {

          // Muestra un objeto vacío, ya que el servidor no devuelve nada.
          console.log(peliculaEliminada);
        
          // Elimina la tarea del array
          this.peliculas.splice(indice, 1);
        });      
      }
    );    
  }

  //------------------------------------------------------------------
  // Carga de datos
  //------------------------------------------------------------------
  manejarPaginaSeleccionada(pagina: number): void {
    const cantidadPorPagina = 10;
    const inicio = (pagina - 1) * cantidadPorPagina;
    this.cargarPeliculas('', inicio, cantidadPorPagina);
  }
  /**
   * Pasado el término, carga las peliculas.
   * 
   * @param termino 
   */
  cargarPeliculas(termino: string = '', inicio: number = 0, cantidad: number = 10): void {
    // Llama a cargar los peliculas desde el servicio
    this.peliculasService.getPeliculas(termino, inicio, cantidad)
      .subscribe(
        peliculas => this.peliculas = peliculas
      );
  }
  cargarPeliculasPorLetra(letra: string): void {
    this.peliculasService.getPorInicial(letra)
      .subscribe(
        peliculas => this.peliculas = peliculas,
        error => this.dialogService.mostrarMensaje('Error al cargar las películas por letra ' + letra)
      );
  }

}
