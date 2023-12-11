import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {

  constructor() { }

  //---------------------------------------------------------------
  // Variables globales al servicio 
  //---------------------------------------------------------------  

  // Definición de los errores que se pueden emitir cuando se validan campos independientes
  private mensajesError : any = {
    noEmpiezaMayuscula: "El valor debe comenzar por mayúscula",
    required: "Campo requerido",
    iguales: "Campos iguales",
    anoInvalido: "El campo año no puede tener más de 4 dígitos"
  }

  //---------------------------------------------------------------
  // Funciones para obtener el texto de los errores
  //---------------------------------------------------------------
  getMensajeError(error: string): string {
    return this.mensajesError[error];
  } 

  // Permite a otras clases de validación añadir sus mensajes aquí
  registrarMensajeError(clave: string, valor: string) {
    this.mensajesError[clave] = valor;
  }

  //---------------------------------------------------------------
  // Validaciones de campos
  //---------------------------------------------------------------

  validarEmpiezaMayuscula(control: FormControl): ValidationErrors | null {
    const inicial = control.value?.trim()[0];
    if (inicial && inicial !== inicial.toUpperCase()) {
      return { noEmpiezaMayuscula: true };
    }
    return null;
  }

  validarAnoCuatroDigitos(control: FormControl): ValidationErrors | null {
    const valor = control.value;
    if (valor !== null && valor !== undefined && !/^\d{4}$/.test(valor.toString())) {
      return { anoInvalido: true };
    }
    return null;
  }
  

  //---------------------------------------------------------------
  // Validaciones de formularios
  //---------------------------------------------------------------
  // Esta función retorna un validador. El objetivo es validar que dos campos sean diferentes
  camposNoIguales(campo1: string, campo2: string) {
      
    // Retorna una función que trata el formgroup que va a hacer las comprobaciones
    return ( formGroup : AbstractControl): ValidationErrors | null => {

      const valor1 = formGroup.get(campo1)?.value;
      const valor2 = formGroup.get(campo2)?.value;

      if(valor1 == valor2) {

        // Defino el error
        const error = {
          iguales: true
        }

        // Establece el error en el segundo campo que se ha comparado
        // Esto es importante para que se pueda mostrar el error correctamente en la vista
        formGroup.get(campo2)?.setErrors(error);

        // Retorna el error
        return error;

      } else {
        
        // Me aseguro de eliminar el error en caso de que la validacióm se pase 
        // OJO. Se elimina cualquier error que tuviera antes el campo
        formGroup.get(campo2)?.setErrors(null);
      }

      return null;
    }
  }
}
