import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasRoutingModule } from './peliculas-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AbecedarioComponent } from '../peliculas/pages/abecedario/abecedario.component';
import { TablaPeliculasComponent } from './components/tabla-peliculas/tabla-peliculas.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { EditarComponent } from './pages/editar/editar.component';
import { PaginadorAbecedarioComponent } from './components/paginador-abecedario/paginador-abecedario.component';
import { TodosComponent } from './pages/todos/todos.component';
import { PaginadorNumericoComponent } from './components/paginador-numerico/paginador-numerico.component';


@NgModule({
  declarations: [
    AbecedarioComponent,
    EditarComponent,
    TablaPeliculasComponent,
    PaginadorAbecedarioComponent,
    TodosComponent,
    PaginadorNumericoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PeliculasRoutingModule,
    SharedModule
  ]
})
export class PeliculasModule { }
