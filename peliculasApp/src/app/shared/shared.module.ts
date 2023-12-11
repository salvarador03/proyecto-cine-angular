import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContadorComponent } from './components/contador/contador.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FiltroBusquedaComponent } from './components/filtro-busqueda/filtro-busqueda.component';
import { SelectComponent } from './components/select/select.component';


@NgModule({
  declarations: [
    ContadorComponent,
    MenuComponent,
    FiltroBusquedaComponent,
    SelectComponent
  ],  
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ContadorComponent,
    FiltroBusquedaComponent,
    MenuComponent,
    SelectComponent
  ]
})
export class SharedModule { }
