import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiTuromasService {

  constructor(private http: HttpClient) {}

  public getMateriales(): string[] {
    let endpoint = "http://80.38.172.196:8081/turomas-api/store/v1.3/materials";
    //return this.http.get<Materiales>(endpoint);

    let materiales =  ["Vidrio simple", "Vidrio Doble", "Vidrio templado"].concat([]); //concatenar con uno vacio
    return materiales;
  }

  public getCaballetes(): string[] {
    let endpoint = "http://80.38.172.196:8081/turomas-api/store/v1.3/structure";
    //return this.http.get<Caballetes>(endpoint);

    let estructura = ["Ax01","Ax02","Ax03","Ax04","B1","B2"].concat([]);
    return estructura;
  }

}
