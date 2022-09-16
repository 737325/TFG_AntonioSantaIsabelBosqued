import { Rectangle } from "tesseract.js";


/* Objeto que almacena las dimensiones de una Plantilla determinada,
 * la cual será usada a modo de guía por el operario para hacer
 * correctamente la Foto sobre la que se aplicará el OCR  */
export class PlantillaDatos {
  public proveedor: string;
  public nombre: string;
  public ancho:number;
  public alto:number;
  public campos: Rectangle[] = new Array<Rectangle>();

  constructor(proveedor: string, nombre: string, ancho:number, alto:number, campos: Rectangle[]){
    this.proveedor = proveedor;
    this.nombre = nombre;

    this.ancho = ancho;
    this.alto = alto;
    this.campos = campos;
  }

    public getProveedor(): string {
      return this.proveedor;
    }

    public setProveedor(proveedor: string): void {
      this.proveedor = proveedor;
    }


    public getAncho(): number {
      return this.ancho;
    }

    public setAncho(ancho: number): void {
      this.ancho = ancho;
    }

    public getAlto(): number {
      return this.alto;
    }

    public setAlto(alto: number): void {
      this.alto = alto;
    }

    public getNombre(): string {
      return this.nombre;
    }

    public setNombre(nombre: string): void {
      this.nombre = nombre;
    }



  public getRectangulos(): Rectangle[]{
    return this.campos;
  }


}

