import { Etiqueta } from '../modelos/Etiqueta';
import { Component, ElementRef, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { ImageLike, Rectangle } from 'tesseract.js';


@Component({
  selector: 'ComponenteCamara',
  templateUrl: './camaraOCR.component.html',
  styleUrls: ['./camaraOCR.component.css']
})
export class CamaraOCRComponent implements OnInit {
  [x: string]: any;
  @ViewChild("video", { static: false })
  public video!: ElementRef;

  @ViewChild("canvasLienzo", { static: false })
  public canvasLienzo!: ElementRef;

  @ViewChild("canvasFoto", { static: false })
  public cvFoto!: ElementRef;

  @ViewChild("btnFoto", { static: false })
  public btnFoto!: ElementRef;

  //Crear el EventListener para avisar de que la camara está lista
  @Output()
  propagar = new EventEmitter<string>();

  // Muestra/Oculta la camara de pantalla
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string = '';

  public constraints = {          //ELIGE LA ORIENTACION DE LA CAMARA
    facingMode: { exact: "environment" } //"environment" para la exterior, "user" para la interior
  };
  public defaultsOpts = { audio: false, video: this.constraints};
  public shouldFaceUser = true;
  public flipBtn: boolean = true;

  supports = navigator.mediaDevices.getSupportedConstraints();
  public dispositivosCamara: MediaDeviceInfo[] = Array<any>();
  public camaraActual: number = 0;

  public imagenObtenida: ImageLike = '';
  public error: any;
  public video1: any;
  public canvas1:any;

  /* Valores de la pantalla del usuario */
  /* Se obtiene automaticamente cuando se inicia el streaming */
  WIDTH = 0;
  HEIGHT = 0;
  CELDA = 10;

  DESPLAZAMIENTO = 0;

  coordPantalla!: number;
  areaProveedor!: Rectangle;
  rectangulos: Rectangle[] = [];

  // --- Imagen capturada por la camara sobre la que realizar OCR ---
  public captures: string[] = [];

  public isProvCaptured: boolean = false;
  public isDatCaptured: boolean = false;

  //#region === INIT ===

  ngOnInit() {
    this.setupDevices();
  }

  /* Configurar los dispositivos de video */
  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        //const stream = await navigator.mediaDevices.getUserMedia(this.defaultsOpts);
        const stream = await navigator.mediaDevices.getUserMedia(this.defaultsOpts);
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          await this.video.nativeElement.play();        //Await necesario para que redimensionar Funcione Bien
          this.redimensionarPaneles(1);

          this.error = null;
          console.log("¡Camarita ready Mi Rey!");

          this.onPropagar(); //Emite la señal que indica que la camara está preparada

        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }
  //#endregion

  //#region === EVENTO PERSONALIZADO CAMARA->PADRE ===
  onPropagar() {
    console.log("CAMARA: enviando evento");
    this.propagar.emit('emitiendo'); //El argumento es lo que mandamos al padre
  }
  //#endregion

  public redimensionarPaneles(alturaPlantilla:number) {
    // this.video1 = document.getElementById("video");
    this.video1 = this.video.nativeElement;

    /**HEIGHT Y WIDTH estan en px, altura plantilla es el numero en el que  */
    this.HEIGHT = this.video1.clientHeight;               console.log("h: " +this.video1.clientHeight);
    this.WIDTH = this.video1.clientWidth;                 console.log("w: " +this.video1.clientWidth);
    this.CELDA = (this.HEIGHT/alturaPlantilla);
    this.DESPLAZAMIENTO = this.WIDTH/4;


    // this.redimensionarElemento("canvasLienzo");
    this.canvasLienzo.nativeElement.height = this.HEIGHT;
    this.canvasLienzo.nativeElement.width = this.WIDTH;
    this.cvFoto.nativeElement.height = this.HEIGHT;
    this.cvFoto.nativeElement.width = this.WIDTH;
  }

  public redimensionarElemento(elemento:string){
    this.canvas1 = document.getElementById(elemento);
    this.canvas1.height = this.HEIGHT;
    this.canvas1.width = this.WIDTH;
  }

  async ObtenerFoto(): Promise<ImageLike> {
    this.capture(this.cvFoto);
    return this.imagenObtenida;
  }

  capture(canvas: ElementRef) {
    this.isProvCaptured = true;
    this.drawImageToCanvas(this.video.nativeElement, canvas);
    this.captures.push(canvas.nativeElement.toDataURL("image/png"));
    this.imagenObtenida = canvas.nativeElement.toDataURL("image/png");
  }

  //#region === DIBUJAR ===

  /* Esta funcion dibuja una imagen en el canvas indicado */
  drawImageToCanvas(image: any, canvas: ElementRef) {
    console.log(image);
    canvas.nativeElement.getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }

  removeCurrent() {
    this.isProvCaptured = false;
  }

  public DibujarPlantilla(etiqueta: Etiqueta, canvas: ElementRef<any>): void {
    this.DibujarMarco(this.canvasLienzo, { left: this.DESPLAZAMIENTO, top:0, width:etiqueta.anchura*this.CELDA, height:etiqueta.altura*this.CELDA});
    etiqueta.mapCampos.forEach((value) => {
      this.drawRectangle(canvas, value[0]);
    })
  }
  public DibujarMarco(lienzo: ElementRef, rectangulo: Rectangle): void{
    let ioctx = lienzo.nativeElement.getContext('2d');
    ioctx.fillStyle = 'rgb(0, 255, 0, 0.2)';
    ioctx.fillRect(rectangulo.left, rectangulo.top, rectangulo.width, rectangulo.height);
  }

  public drawRectangle(lienzo: ElementRef,rectangulo: Rectangle): void {
    let ioctx = lienzo.nativeElement.getContext('2d');

    ioctx.strokeWidth = 0;
    ioctx.strokeStyle = 'black';
    ioctx.fillStyle = 'rgba(255, 0, 0, 0.4)';

    ioctx.strokeRect(rectangulo.left, rectangulo.top, rectangulo.width, rectangulo.height);
    ioctx.fillRect(rectangulo.left, rectangulo.top, rectangulo.width, rectangulo.height);
  }
  //#endregion
}
