import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { PeliculasService } from '../services/peliculas.service';
import { ValidacionService } from 'src/app/shared/services/validacion.service';

@Injectable({
  providedIn: 'root'
})
export class ValidacionDescripcionService implements AsyncValidator {

  constructor(
    private validacionService: ValidacionService,
    private peliculasService: PeliculasService
  ) {       
      this.validacionService.registrarMensajeError("descripcionDuplicada", "La descripción ya existe");
  }

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    // Obtengo la descripción como argumento
    const descripcion = control.value;

    // Uso un pipe para evaluar y retornar el objeto necesario para generar validation errors
    // Utilizo el operador map para cambiar el objeto que recibo por el objeto con el error
    return this.peliculasService.getPeliculasPorDescripcion(descripcion)
      .pipe(
        map( peliculas => {          
          if (peliculas.length > 0) {
            return { descripcionDuplicada: true };
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
