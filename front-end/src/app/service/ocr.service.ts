import { Rectangle } from 'tesseract.js';
import { Injectable } from '@angular/core';
import * as Tesseract from 'tesseract.js';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OCRService {
  private lectorBSubject = new BehaviorSubject<Map<any,any>>(new Map());
  resMap: Map<string,string> = new Map();

  constructor() { }

  /* Realiza OCR sobre el area indicada en una imagen */
  async LeerArea(imagen:any, area:Rectangle, filtro:string): Promise<string> {
    const { createWorker } = Tesseract;
    const worker = createWorker();
    try{
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');

      const rectangle = area;
      worker.setParameters({tessedit_char_whitelist: filtro});
      const { data: { text } } = await worker.recognize(imagen, {rectangle});
      console.log("OCR leyó: "+ text);
      worker.terminate();
      return text;

    }catch(error){
      worker.terminate();
      console.log('worker terminated');
      console.log(console.error);
      return 'ERROR EN LeerArea()';
    }
  }

  async readImage(imagen:any, rectangleMap:Map<any,any>) {
    this.resMap = new Map();
    try{
        for (let [key, value] of rectangleMap) {
          console.log("Iteracion del ForLector: " + key + " : " + value);
          await this.LeerArea(imagen, value[0], value[1]).then(res => (this.resMap.set(key, res)));
        }
      console.log("CAMPOS LEIDOS: " + this.resMap.size);
      this.updateActive();
    }catch{}
  }

  public getData(): Observable<Map<any,any>> {
    return this.lectorBSubject.asObservable();
  }

  public updateActive() {
    this.lectorBSubject.next(this.resMap);
  }
}
