import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { PeliculasService } from '../services/peliculas.service';
import { ValidacionService } from 'src/app/shared/services/validacion.service';

@Injectable({
  providedIn: 'root'
})
export class ValidacionTituloService implements AsyncValidator {

  constructor(
    private validacionService      : ValidacionService,
    private peliculasService       : PeliculasService
  ) {       
      validacionService.registrarMensajeError("tituloDuplicado", "El titulo ya existe");
  }

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    // Obtengo el titulo como argumento
    const titulo = control.value;

    // Tendré que usar un pipe que evalue y me retorne el objeto que necesito para generar validation errors
    // Utilizo el operador map para cambiar el objeto que recibo por el objeto con el error
    return this.peliculasService.getPeliculasPorTitulo(titulo)
      .pipe(

        // Esta pausa me permite comprobar como cambia el estado del formulario de INVALID a PENDING a VALID
        //delay(5000),
        
        map( peliculas => {          
          if(peliculas.length > 0) {
            return { tituloDuplicado: true }
          } else {
            return null;
          }            
        })  
      );    
  }

  registerOnValidatorChange?(fn: () => void): void {
    return;
  }
}
