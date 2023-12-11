import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeliculasService } from '../services/peliculas.service';
import { ValidacionService } from 'src/app/shared/services/validacion.service';

@Injectable({
  providedIn: 'root'
})
export class ValidacionTituloService implements AsyncValidator {

  constructor(
    private validacionService: ValidacionService,
    private peliculasService: PeliculasService
  ) {       
      this.validacionService.registrarMensajeError("tituloDuplicado", "El titulo ya existe");
  }

  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
    const titulo = control.value;

    // Si no hay título, no hace falta validar
    if (!titulo) {
      return of(null);
    }

    return this.peliculasService.getPeliculasPorTitulo(titulo).pipe(
      map(peliculas => peliculas.length > 0 ? { tituloDuplicado: true } : null)
    );
  }

  registerOnValidatorChange?(fn: () => void): void {
    return;
  }
}
