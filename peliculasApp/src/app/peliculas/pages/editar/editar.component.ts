import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ValidacionService } from 'src/app/shared/services/validacion.service';
import { ValidacionTituloService } from '../../validators/validacion-titulo.service'; // Asegúrate de tener la ruta correcta
import { PeliculasService } from '../../services/peliculas.service';
import { Pelicula } from 'src/app/peliculas/interfaces/pelicula.interface';
import { ValidacionDescripcionService } from '../../validators/validacion-descripcion.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent {

  formulario!: FormGroup; // Este operador le indica a TypeScript que la variable se inicializará de manera definitiva, aunque no sea directamente en el constructor.
  // Indica si la tarea se está actualizando
  actualizando: boolean = false;

  // Defino campos sueltos auxiliares que voy a utilizar
  // En este caso utilizo este para el datalist aunque en este caso
  // lo podría meter dentro del formulario ya que no va a afectar al funcionamiento.
  nombreInformador: FormControl = this.fb.control('', Validators.required);

  // Estos arrays contendrán los elementos que voy a cargar en los selects
  // selectInformador    : EntradaSelect[] = [];
  // selectAsignado      : EntradaSelect[] = [];
  // selectTiposTarea    : EntradaSelect[] = [];
  // selectEstadosTarea  : EntradaSelect[] = [];

  //-------------------------------------------------------------------------------------
  // Inicialización
  //-------------------------------------------------------------------------------------
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialogService: DialogService,
    private peliculasService: PeliculasService,
    private validacionService: ValidacionService,
    private validacionTituloService: ValidacionTituloService,
    private validacionDescripcionService: ValidacionDescripcionService,

    // private validacionTituloService: ValidacionTituloService
  ) { 
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    this.formulario = this.fb.group({
      id: [null],
      titulo: ['', {
        validators: [Validators.required, this.validacionService.validarEmpiezaMayuscula]
      }],
      genero: ['', [Validators.required, this.validacionService.validarEmpiezaMayuscula]],
      ano: ['', [Validators.required, this.validacionService.validarAnoCuatroDigitos]],
      director: ['', [Validators.required, this.validacionService.validarEmpiezaMayuscula]],
      descripcion: ['', {
        validators: [Validators.required, this.validacionService.validarEmpiezaMayuscula]
      }],
      precio: ['', Validators.required],
      descuento: ['']
    }, { validators: this.validarPrecioDescuento });
  }

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.cargarPelicula();
      this.actualizando = true;
      // Aquí podrían ir otros procesos de inicialización relacionados con la edición
    }
    // Carga de contenido adicional, como los valores de los selects
    // this.cargarSelectTiposContacto();
  }


  //-------------------------------------------------------------------------------------
  // Funciones generales del formulario
  //-------------------------------------------------------------------------------------
  /**
   * Guarda los cambios y vuelve a la pantalla anterior. 
   */
  guardar() {

    // Si el formulario no es válido, muestra un mensaje de error y termina
    if(this.formulario.invalid) {
      
      // Marco los campos como tocados. De ese modo se mostrarán todos los errores
      // registrados en los campos
      this.formulario.markAllAsTouched();

      // Muestro mensaje de error
      this.dialogService.mostrarMensaje('Por favor, revise los datos');

      // Finaliza
      return;
    }

    // Si id_tarea es > 0 significa que la tarea ya existía. Es actualización
    if(this.formulario.get('id')?.value > 0) {

      // Actualiza la pelicula
      this.actualizarPelicula();

    } else {

      // Crea la pelicula
      this.crearPelicula();
    }
  } 


  /**
   * Comprueba si un campo es válido
   * 
   * @param campo 
   * @returns 
   */
  esCampoNoValido(campo : string) : boolean | undefined {
    return this.formulario.get(campo)?.invalid && this.formulario.get(campo)?.touched;
  }  


  /**
   * Devuelce el mensaje de error asociado a un campo
   * 
   * @param campo 
   * @returns 
   */
  mensajeErrorCampo(campo : string) : string {
    const errors = this.formulario.get(campo)?.errors;
    let mensajeError = '';
    
    if(errors) {
      for(let e in errors) {

        // Obtiene el mensaje
        const mensaje = this.validacionService.getMensajeError(e);
        mensajeError = mensajeError + mensaje;        

        // Solo quiero el primero en estos momentos. Si hubiera más podría tenerlos en un atributo
        // y mostrarlos con un ngFor
        break;
      }
    }

    return mensajeError;
  }


  //-------------------------------------------------------------------------------------
  // Funciones de persistencia. Permiten guardar y recuperar tareas
  //-------------------------------------------------------------------------------------

  /**
   * Carga una pelicula
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
    .subscribe({

        // Reciebe el siguiente valor
        next: (pelicula: Pelicula) =>  {

          // Cargo los datos en el formulario.
          this.formulario.reset(pelicula);
          
          //this.formulario.patchValue(respuesta.datos);  
        },

        // El observer ha recibido una notificación completa
        complete: () => {     
        },

        // El observer ha recibido un error
        error: (error: any) => {

          // Se vuelve al listado
          this.router.navigate([ '/peliculas/abecedario' ]);

          // Muestra un mensaje de error
          this.dialogService.mostrarToast('No ha sido posible cargar la pelicula: '+ error);
  
          // Muestra el error por consola
          console.log(error);
        }        
    });        
  }


  /**
   * Crea una pelicula a partir de los datos en el form y pasa a modo edición
   */
  crearPelicula() {
    
    this.peliculasService.agregarPelicula(this.formulario.getRawValue()).subscribe(           
      {      
        // Reciebe el siguiente valor
        next: (pelicula: Pelicula) =>  {

          // Se ha guardado la pelicula. Paso a modo edición
          this.router.navigate(['/peliculas/editar', pelicula.id ]);

          // Muestro un toast indicando que se ha guardado la tarea
          this.dialogService.mostrarToast("Pelicula creada");

          // Muestra el pelicula en el log
          console.log(pelicula);
        },

        // El observer ha recibido una notificación completa
        complete: () => {     
        },

        // El observer ha recibido un error
        error: (error) => {
          
          this.dialogService.mostrarMensaje('No ha sido posible crear la pelicula: '+error, 'ERROR');
          console.log(error);
        }
      }
    );              
  }

 /**
   * Actualiza un pelicula
   */
  actualizarPelicula() {
    this.peliculasService.actualizarPelicula(this.formulario.getRawValue())
      .subscribe(

        {      
          // Reciebe el siguiente valor
          next: (pelicula: Pelicula) =>  {              
          },

          // El observer ha recibido una notificación completa
          complete: () => {     
            this.dialogService.mostrarToast("Pelicula modificada");
          },

          // El observer ha recibido un error
          error: (error) => {
            this.dialogService.mostrarMensaje('No ha sido posible crear la pelicula: '+error, 'ERROR');
            console.log(error);
          }
        }
      );
  }
  validarPrecioDescuento(control: AbstractControl): ValidationErrors | null {
    const precio = control.get('precio')?.value;
    const descuento = control.get('descuento')?.value;
  
    if (precio != null && descuento != null && descuento > precio) {
      // Devuelve un objeto de error si el descuento es mayor que el precio
      return { 'descuentoInvalido': true };
    }
    return null; // No hay error
  }
  

}
