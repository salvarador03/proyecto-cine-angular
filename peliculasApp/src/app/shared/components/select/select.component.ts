import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/peliculas/services/peliculas.service';
import { Pelicula } from 'src/app/peliculas/interfaces/pelicula.interface'; 

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit {
  peliculas: Pelicula[] = []; // Array para almacenar las películas
  selectedOrder = 'id'; // valor por defecto del select

  constructor(private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.cambiarOrden('asc');
  }

  cambiarOrden(orden: string): void {
    const campo = this.selectedOrder; // Utiliza la propiedad selectedOrder para el campo
    this.peliculasService.ordenarPeliculas(campo, orden).subscribe(
      peliculas => {
        this.peliculas = peliculas; 
      },
      error => {
        console.error('Error al obtener películas:', error);
      }
    );
  }
}


