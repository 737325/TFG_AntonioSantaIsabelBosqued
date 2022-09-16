import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObtenerPlantillaComponent } from './ObtenerPlantilla/ObtenerPlantilla.component';
import { ListaDatosComponent } from './ListaDatos/ListaDatos.component';

//AQUI SE INDICAN LAS DIFERENTES RUTAS PARA MOVERNOS POR LA APLICACION
const routes: Routes = [
  { path: '', redirectTo: 'ObtenerPlantilla', pathMatch: 'full' },
  { path: 'ObtenerPlantilla', component: ObtenerPlantillaComponent },
  { path: 'ListaDatos', component: ListaDatosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
