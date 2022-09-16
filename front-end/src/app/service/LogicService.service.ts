import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PlantillaDatos } from '../modelos/PlantillaDatos';

@Injectable({
  providedIn: 'root'
})
export class LogicServiceService {
  private plantillaElegida: PlantillaDatos = new PlantillaDatos("","",0,0,[]);
  private approvalStageMessage = new BehaviorSubject(this.plantillaElegida);
  currentApprovalStageMessage = this.approvalStageMessage.asObservable();

  updateSelectedPlantilla(message: PlantillaDatos) {
    this.approvalStageMessage.next(message);
  }

  constructor() { }

}
