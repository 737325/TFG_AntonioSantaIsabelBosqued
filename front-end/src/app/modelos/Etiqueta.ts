import { MapType } from '@angular/compiler';
import { Rectangle } from 'tesseract.js';

export class Etiqueta {
  public proveedor: string;
  public anchura: number;
  public altura: number;

  public mapCampos:Map<any,any> = new Map();

  //USAR map
  /* Orden en el que deben ir los /* Campos: Dimensiones, Hojas, Lote */
  constructor(proveedor:string, ancho:number, alto:number, areasLectura: Rectangle[]) {
    this.proveedor = proveedor;
    this.anchura = ancho;
    this.altura = alto;

    /**El mapa campos esta compuesto por: {nombre,[Rectangulo, filtroOCR]} */
    this.mapCampos.set("Dimensiones",[areasLectura[0],'0123456789xX']);
    this.mapCampos.set("Hojas",[areasLectura[1],'0123456789']);
    this.mapCampos.set("Lote", [areasLectura[2],'']);
  }

  public getProveedor(): string{
    return this.proveedor;
  }
}
