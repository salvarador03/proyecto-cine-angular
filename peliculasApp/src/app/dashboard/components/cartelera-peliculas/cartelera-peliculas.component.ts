// cartelera-peliculas.component.ts
import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/peliculas/interfaces/pelicula.interface'
import { PeliculasService } from 'src/app/peliculas/services/peliculas.service'; 

@Component({
  selector: 'app-cartelera-peliculas',
  templateUrl: './cartelera-peliculas.component.html'
})
export class CarteleraPeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    this.peliculasService.getPeliculas().subscribe(
      peliculas => this.peliculas = peliculas,
      error => console.error('Error al cargar películas', error)
    );
  }
}
