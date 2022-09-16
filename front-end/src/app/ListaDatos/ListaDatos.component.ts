import { Formulario } from '../modelos/Formulario';
import { Etiqueta } from '../modelos/Etiqueta';
import { PlantillaDatos } from '../modelos/PlantillaDatos';

import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';

import { CamaraOCRComponent } from '../camara/camaraOCR.component';

import { OCRService } from '../service/ocr.service';
import { ApiServidorService } from '../res-api/servicios/apiServidor.service';
import { LogicServiceService } from '../service/LogicService.service';
import { ApiTuromasService } from '../res-api/servicios/apiTuromas.service';
import { Rectangle } from 'tesseract.js';


@Component({
  selector: 'bloqueListaDatos',
  templateUrl: './ListaDatos.component.html',
  styleUrls: ['./ListaDatos.component.css']
})

/**Componente donde se saca la imagen y se aplica el OCR */
export class ListaDatosComponent implements OnInit {
  isBloqueado: boolean = false;
  proveedor: string = "Proveedor vacio testeo";
  plantillaElegida?: PlantillaDatos;

  caballetes: Array<string> = [];
  materiales: Array<string> = [];
  materialElegido: string = "testeo material";
  caballeteElegido: string = "Ax01"

  plantEtiqueta: Etiqueta = new Etiqueta('',0,0,[]);

  /*Cambiar constructor de Formulario */
  formulario: Formulario = new Formulario(this.proveedor);

  leidos: Map<string,string> = new Map();

  @ViewChild("camara", { static: false })
  camara!: CamaraOCRComponent;

  constructor( private ocrServ: OCRService, private logicService: LogicServiceService, private apiTuromas: ApiTuromasService,private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.logicService.currentApprovalStageMessage.subscribe(
      msg => {this.plantillaElegida = msg
      this.subscribeToOptimization();
      this.proveedor = this.plantillaElegida.proveedor;
      })

      console.log(this.plantillaElegida);

      setTimeout(()=>{this.DibujarPlantilla(this.camara.canvasLienzo, this.plantEtiqueta)},0);

      //Llamada a Api turomaslink obtener caballetes y materiales
      this.materiales = this.apiTuromas.getMateriales();
      this.caballetes = this.apiTuromas.getCaballetes();
  }

  //#region === EVENTO ===
  /* Funcion encargada de tratar el evento de la camara lista.
   *
   * El DibujarPlantilla esta encapsulado en el setTimeout porque si no, falla
   * desconocemos el motivo. No es necesario hacerlo esperar tiempo, simplemente
   * dejarlo dentro de la llamada
   */
  procesaPropagar(mensaje: string) {
    console.log("Saltó el evento personalizado " + mensaje);

    this.plantEtiqueta = this.ObtenerPlantilla(this.plantillaElegida!);
    this.DibujarPlantilla(this.camara.canvasLienzo, this.plantEtiqueta);

    setTimeout(()=>{this.DibujarPlantilla(this.camara.canvasLienzo, this.plantEtiqueta)},0);
  }
  //#endregion

  //#region === BUSCAR Y DIBUJAR LA PLANTILLA ===

  /* HILO PRINCIPAL */
  /*Funcion encargada de Adaptar la plantilla elegida y escalarla al tamaño de la camara para superponerla a ella */
  public ObtenerPlantilla(plantillaElegida:any):Etiqueta{
    console.log("PLANTILLA DATOS: ");
    console.log(plantillaElegida);
    /* Orden Campos: Material, Dimensiones, Hojas, Lote */
    let etiquetaBase: Etiqueta = this.normalizarPlantilla(plantillaElegida);

    console.log(etiquetaBase);
    /**ETIQUETA DE PRUEBA */
    /*etiquetaBase = new Etiqueta("Sysecam", 8, 14, [
      { left: 2, top: 6, width: 5, height: 1 },{ left: 2, top : 5, width: 5, height: 1 },
      { left: 5, top: 4, width: 3, height: 1 },{ left: 2, top: 11, width: 4, height: 1}]);
    /** BORRAR */

    /* Es necesario llamar a redimensionar desde aquí porque tenemos que indicarle la plantilla que se ha cargado
     * para poder dividir la camara en celdas. */
    this.camara.redimensionarPaneles(etiquetaBase.altura);

    /** Ahora obtenemos el tamaño celda, camara dividida en partes para dibujar la plantilla **/
    console.log("Tamaño celda: "+this.camara.CELDA)

    /* Escalamos la plantilla respecto al tamaño de la camara */
    let etiquetaEscalada = this.EscalarPlantilla(etiquetaBase, this.camara.CELDA);

    return etiquetaEscalada;
  }

  /**Obtiene la plantillaDatos y la transforma en una Etiqueta */
  public normalizarPlantilla(pDatos: any):Etiqueta{
    let camposNormalizados: Rectangle[] = [];

    for (var i in pDatos.campos){
      let rectangleCampo: Rectangle = { left: pDatos.campos[i].left, top: pDatos.campos[i].top, width: pDatos.campos[i].width, height: pDatos.campos[i].height};
      camposNormalizados.push(rectangleCampo);
    }

    let etiquetaNueva = new Etiqueta(pDatos.proveedor,pDatos.ancho,pDatos.alto,camposNormalizados);
    return etiquetaNueva;
  }

  public EscalarPlantilla(plantillaB: Etiqueta, escalado: number):Etiqueta{
    for (const key of plantillaB.mapCampos.keys()) {
      let campo = plantillaB.mapCampos.get(key);
      campo[0] = {left: (campo[0].left *escalado) + this.camara.DESPLAZAMIENTO, top: campo[0].top *escalado,
         width: campo[0].width *escalado, height: campo[0].height *escalado };
      console.log(campo[0]);
    }
    return plantillaB;
  }

  //#endregion


  //#region === OBTENER DATOS ===
  /**Se llama con el boton de hacer Foto */
  public async ObtenerDatos(){
    try{
      //Bloquear la pantalla
      this.isBloqueado = true;

      //Paso 1. Obtener Foto
      let foto;
      await this.camara.ObtenerFoto()
        .then(res=>{
          foto = res;
          console.log("ObtenerFoto terminado");
        }
      );

      //Paso 2. OCR a la Foto
      this.ocrServ.readImage(foto, this.plantEtiqueta.mapCampos);
      console.log("LeerImagen terminado");

      this.DibujarPlantilla(this.camara.cvFoto, this.plantEtiqueta); //Dibuja sobre la imagen otra vez la plantilla
    }catch{}
  }

  public DibujarPlantilla(canvas: ElementRef<any>, etiqueta: Etiqueta){
    console.log("ENTRANDO EN DIBUJAR PLANTILLA");
    console.log(etiqueta);
    this.camara.DibujarPlantilla( etiqueta, canvas);
  }

  subscribeToOptimization(): void {
    //Aquí obtiene los datos leidos por el OCR
    this.ocrServ.getData()
      .subscribe(data => {
        if (!data || data.size == 0) {
          return;
        }

        //this.leidos = data;
        //Paso 3. Normalizar los datos obtenidos por el OCR
        let datos = this.normalizarDatos(data);
        console.log("Normalizar terminado");

        //Paso 4. Crear el Formulario en base a los datos obtenidos
        this.formulario = this.CrearFormulario(this.proveedor, datos);
        console.log("CrearFormulario terminado");

        //Desbloqueamos la pantalla
        this.isBloqueado=false;
    });
  }

  /* Campos: Material, Dimensiones, Hojas, Lote */
  public normalizarDatos(leidos: Map<any,any>): Map<string,any> {
    let datos = new Map<any,any>();
    datos.set("Dimensiones",this.SplitLong(leidos.get("Dimensiones"),('X'))); //Dimensiones 1 y 2
    datos.set("Hojas",leidos.get("Hojas")); //Hojas en sisecam
    datos.set("Lote",leidos.get("Lote"));  //Lote: string

    return datos;
  }

  public SplitLong(dimensiones :string, separador:string):number[]{
    let dims = new Array<number>();
    let splitted:string[] =  dimensiones.split(separador,2);

    if(splitted.length < 2){
      splitted = dimensiones.split('x',2);
    }

    dims.push((splitted[0] as unknown as number),(splitted[1] as unknown as number));
    return dims;
  }

  /* Campos: Material, Dimensiones, Hojas, Lote */
  public CrearFormulario(proveedor:string, mapCampos:Map<any,any>): Formulario {
    let f = new Formulario(proveedor);
    try{
      f.setProveedor(this.proveedor);
      f.setMaterial(mapCampos.get("Material"));
      f.setLongitud1(mapCampos.get("Dimensiones")[0]);
      f.setLongitud2(mapCampos.get("Dimensiones")[1]);
      f.setHojas(mapCampos.get("Hojas"));
      f.setLote(mapCampos.get("Lote"));
      return f;
    }catch{
      return new Formulario("FALLO");
    }
  }
 //#endregion

 //#region === ENVIO DE FORMULARIO
  public EnviarRegistro(formulario:Formulario){
    //Llamada al Turomas Link/ put
  }
 //#endregion

}
