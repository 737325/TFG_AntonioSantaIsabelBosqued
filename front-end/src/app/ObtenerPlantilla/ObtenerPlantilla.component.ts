import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { LogicServiceService } from '../service/LogicService.service';
import { PlantillaDatos } from '../modelos/PlantillaDatos';
import { ApiServidorService } from '../res-api/servicios/apiServidor.service';

@Component({
  selector: 'bloqueObtenerPlantilla',
  templateUrl: './ObtenerPlantilla.component.html',
  styleUrls: ['./ObtenerPlantilla.component.css']
})
export class ObtenerPlantillaComponent implements OnInit {
  imagenProveedor: any;
  listadoPlantillas: PlantillaDatos[] = [];
  providersMap = new Map<string, Array<PlantillaDatos>>();

  isCargadas: boolean = false;

  /*PARA TESTEAR QUE LA BD FUNCIONA Y RETORNA UN LISTADO */
  pruebaRetornoBD:string = "";



  /* Array de plantillas con todas las disponibles por la empresa */
  /* Campos de coords. de cada etiqueta: Material, Dimensiones, Hojas, Lote
  sisecamEtq: Etiqueta = new Etiqueta("Sisecam", 8, 14,[]);
  public plantillasEmpresas: Etiqueta[] = [];*/

  constructor(private logicService: LogicServiceService, private router: Router, private apiServidor: ApiServidorService) { }

  ngOnInit() {
    /* Obtenemos del sistema de persistencia las plantillas*/
    this.apiServidor.getListadoPlantillas().subscribe(
      plantillas => {
        this.listadoPlantillas = plantillas;
        this.ordenarPlantillas();
      }
    );
    this.pruebaRetornoBD = "Hay " + this.listadoPlantillas.length + " plantillas."
  }

  //#region === OBTENER Y ENVIAR PROVEEDORES ===
  /* El proveedor se obtiene de la BD */
  public ordenarPlantillas() {

    let listadoAuxiliar = new Array<PlantillaDatos>();

    this.providersMap = new Map<string, Array<PlantillaDatos>>()

    /* Comprobamos plantilla por plantilla, si ya está su proveedor en el sistema *
     * Si ya existe, se añade la plantilla al array de plantillas de dicho prov   *
     * Si no, se crea una nueva entrada en la tabla hash para dicho prov         */
    for(var plantilla of this.listadoPlantillas){
      listadoAuxiliar = [];

      if(this.providersMap.has(plantilla.proveedor)){
        listadoAuxiliar = this.providersMap.get(plantilla.proveedor)!;
        listadoAuxiliar!.push(plantilla);
        this.providersMap.set(plantilla.proveedor, listadoAuxiliar!);
      }else{
        listadoAuxiliar.push(plantilla);
        this.providersMap.set(plantilla.proveedor, listadoAuxiliar);
      }

    }
    /* Las plantillas ya estan listas para ser mostradas en la vista mediante la tabla hash */
    this.isCargadas = true;
  }


  /* Este metodo se hace para transicionar a la carga de la plantilla seleccionada. Componente ListaDatos (routing) */
  public seleccionarPlantilla(plantillaElegida: PlantillaDatos) {
    try{
      this.logicService.updateSelectedPlantilla(plantillaElegida);
      console.log(plantillaElegida);
      this.router.navigate(["ListaDatos"]);
    } catch (error){
      alert(error);
    }
  }
  //#endregion

}
