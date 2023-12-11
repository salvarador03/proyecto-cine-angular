import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pelicula } from '../interfaces/pelicula.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  // Ruta base para todas las llamadas al servicio
  // se toma de environment
  private peliculasUrl = `${environment.peliculasBackendBaseUrl}/peliculas`;
  private debug = environment.debug;

  constructor(
    // Necesitamos este objeto para hacer peticiones. 
    private httpClient: HttpClient    
  ) { }

  /**
   *  Dado el filtro y parámetros del paginador, retorna las peliculas que coinciden con el criterio.
   */ 
  getPeliculas(filtro: string = '', inicio: number = 0, cantidad: number = 10): Observable<Pelicula[]> {
    let url = `${this.peliculasUrl}?_start=${inicio}&_limit=${cantidad}`;

    if (filtro.length) {
      url += `&q=${filtro}`;
    }

    return this.httpClient.get<Pelicula[]>(url);
  }

  /**
   * Obtiene una pelicula
   */
  getPelicula(id : String): Observable<Pelicula> {
      
    // Calcula el recurso incluyendo el filtro
    const url : string = `${this.peliculasUrl}/${id}`;

    // Carga la pelicula
    return this.httpClient.get<Pelicula>(url);
  }  
  
  /**
   * Obtiene una pelicula por titulo
   */
  getPeliculasPorTitulo(titulo : String) : Observable<Pelicula []> {
    const url : string = `${this.peliculasUrl}?nombre=${titulo}`;

    // Carga la pelicula
    return this.httpClient.get<Pelicula []>(url);
  }
  /**
   * Obtiene películas por su descripción
   */
    getPeliculasPorDescripcion(descripcion: string): Observable<Pelicula[]> {
      const url: string = `${this.peliculasUrl}?descripcion=${descripcion}`;
  
      // Carga las películas que coinciden con la descripción
      return this.httpClient.get<Pelicula[]>(url);
    }

  /**
   * Agrega una pelicula a la base de datos
   */
  agregarPelicula(pelicula: Pelicula) : Observable<Pelicula> {
    
    // Nos aseguramos de que la pelicula no tiene atributo ID
    delete pelicula.id;

    // Registra la pelicula que se va a dar de alta en la base de datos    
    console.log(pelicula);

    // Devuelve el resultado
    return this.httpClient.post<Pelicula>(this.peliculasUrl, pelicula);
  }

  /**
   * Borra una pelicula
   */
  borrarPelicula(pelicula : Pelicula): Observable<Pelicula> {
      
    // Calcula el recurso incluyendo el filtro
    const url : string = `${this.peliculasUrl}/${pelicula.id}`;

    // Llama a eliminar la tarea
    return this.httpClient.delete<Pelicula>(url);
  }  


  /**
   * Agrega una pelicula a la base de datos
   */
  actualizarPelicula(pelicula: Pelicula) : Observable<Pelicula> {

    // Calcula el recurso incluyendo el filtro
    const url : string = `${this.peliculasUrl}/${pelicula.id}`;    

    // Registra la pelicula que se va a dar de alta en la base de datos    
    console.log(pelicula);

    // Devuelve el resultado
    return this.httpClient.put<Pelicula>(url, pelicula);
  }
    // Nuevo método para obtener películas por inicial
  getPorInicial(inicial: string, pagina: number = 1, registrosPorPagina: number = 10): Observable<Pelicula[]> {
    const url = `${this.peliculasUrl}?titulo_like=^${inicial}&_page=${pagina}&_limit=${registrosPorPagina}`;
    return this.httpClient.get<Pelicula[]>(url);
  }
  // Método para ordenar de manera ascendente o descendente por los campos de un select
  ordenarPeliculas(campo: string, orden: string, inicio: number = 0, cantidad: number = 10): Observable<Pelicula[]> {
    const url = `${this.peliculasUrl}?_sort=${campo}&_order=${orden}&_start=${inicio}&_limit=${cantidad}`;
    return this.httpClient.get<Pelicula[]>(url);
}

  
}
