import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbecedarioComponent } from './pages/abecedario/abecedario.component';
import { VerComponent } from './pages/ver/ver.component';
import { EditarComponent } from './pages/editar/editar.component';
import { TodosComponent } from './pages/todos/todos.component';

const routes: Routes = [
  
  {
    // peliculas/todos
    path: 'todos',
    component: TodosComponent
  },
  
  {
    // peliculas/abecedario (con componentes)
    path: 'abecedario',
    component: AbecedarioComponent
  },
  
  {
    // tareas/agregar
    path: 'agregar',
    component: EditarComponent
  },
  {
    // editar/XXXX donde XXXX es el id de tarea
    // Desde el componente se puede capturar ese ID
    path: 'editar/:id',
    component: EditarComponent
  },
  {
    // Hace match para /XXXX donde XXXX es el id de tarea
    // desde el componente se captura y se puede mostrar
    // la tarea
    path: ':id',
    component: VerComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasRoutingModule { }
