import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { ResApiModule } from './res-api/res-api.module';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CamaraOCRComponent } from './camara/camaraOCR.component';
import { ListaDatosComponent } from './ListaDatos/ListaDatos.component';
import { ObtenerPlantillaComponent } from './ObtenerPlantilla/ObtenerPlantilla.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    CamaraOCRComponent,
    ObtenerPlantillaComponent,
    ListaDatosComponent
   ],
  imports: [
    BrowserModule,
    [CommonModule],
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ResApiModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatExpansionModule,
    MatListModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent] //modulo desde el que se indica desde que componente se inicia nuestra app. El que contiene el resto de vistas
})
export class AppModule {}
