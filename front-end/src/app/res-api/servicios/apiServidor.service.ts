import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { PlantillaDatos } from 'src/app/modelos/PlantillaDatos';

@Injectable({
  providedIn: 'root'
})
export class ApiServidorService {
  private static API_OBTENER_PLANTILLAS = "";

  //URL del Servidor
  private urlServidor: string = "localhost:8080/api/plantillas";//localhost:8080/api/plantillas
  public static API_ENDPOINT_BACKEND: string = "http://192.168.137.1:8080/api/plantillas"; //
  private peticion: string ="";

  constructor(private http: HttpClient, ){}

  public getListadoPlantillas(): Observable<any> {
    return this.http.get(ApiServidorService.API_ENDPOINT_BACKEND);
  }

  public postPlantillaNueva(plantillaNueva :PlantillaDatos) {

    this.peticion = this.urlServidor
    return this.http.post(this.peticion,plantillaNueva);

  }

  public actualizarPlantilla(plantillaActualizada :PlantillaDatos){
    //Pasar el id al retornar las plantillas
    return this.http.put(this.peticion,plantillaActualizada);
  }

}
