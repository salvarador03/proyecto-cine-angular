import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { PeliculasService } from 'src/app/peliculas/services/peliculas.service';
import { Pelicula } from '../../interfaces/pelicula.interface';

declare var bootstrap: any; // Para usar boostrap 5 al final

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html'
})
export class VerComponent {

  pelicula! : Pelicula;  

  //-------------------------------------------------------------------------------------
  // Inicialización
  //-------------------------------------------------------------------------------------
  
  constructor(
  
    private activatedRoute    : ActivatedRoute,
    private router            : Router,
    private peliculasService     : PeliculasService
  
  ) { }
  
  /**
   * Inicialización de la página
   */
  ngOnInit(): void {
  
    // Carga la pelicula
    this.cargarPelicula();

    // Lógica para mostrar el modal
    this.mostrarModal();
  
  }
  mostrarModal(): void {
    let modalElement = document.getElementById('verPeliculaModal');
  
    if (modalElement) {
      let modal = new bootstrap.Modal(modalElement);
  
      // Agrega un listener para el evento de cierre del modal hidden.bs.modal, que es un evento de boostrap https://getbootstrap.com/docs/4.0/components/modal/
      modalElement.addEventListener('hidden.bs.modal', () => {
        // Redirige a la ruta deseada cuando el modal se cierra
        this.router.navigate(['peliculas/abecedario']);
      });
  
      modal.show();
    } else {
      // Manejar el caso en que el modalElement no se encuentre
      console.error('No se pudo encontrar el elemento del modal');
    }
  }
  
  
  //-------------------------------------------------------------------------------------
  // Funciones de persistencia. Permiten guardar y recuperar tareas
  //-------------------------------------------------------------------------------------
  
  /**
   * Cuando estamos editando, este método carga la tarea que estamos editando en el formulario
   */
   cargarPelicula() {
      
    // Si estamos en modo edición, obtiene los parámeros
    // y carga los datos
    this.activatedRoute.params
      
      // Usamos switchMap, que permite cambiar el id (el parámetro de entrada)
      // por la tarea
      .pipe(
  
          switchMap( ({id}) => this.peliculasService.getPelicula(id) ),
          
          // Este pipe muestra lo que viene
          tap(console.log)
      )
      // Finalmente, este subscribe recibe el resultado, que será el objeto
      .subscribe(pelicula => {
        
          // Carga los datos
          this.pelicula = pelicula;
      });
    }
    
}
