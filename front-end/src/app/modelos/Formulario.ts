export class Formulario {
    private proveedor: string;
    private material: string;
    private estante: string;
    private longitud1: number;
    private longitud2: number;
    private longitud3: number;
    private hojas: number;
    private lote: string;

  /* Campos: Material, Dimensiones, Hojas, Lote */
  constructor(proveedor: string/* , campos:string[] */){
    this.proveedor = proveedor;
    this.material = '__Material__Producto__';
    this.estante ='Indicar Estante ';
    this.longitud1 = 35353535;
    this.longitud2 = 35353535;
    this.longitud3 = 8000.00;
    this.hojas = 25000;
    this.lote = 'Lote a indicar';
  }


/* --- Getters y Setters --- */
    public getProveedor(): string {
        return this.proveedor;
    }

    public setProveedor(proveedor: string): void {
        this.proveedor = proveedor;
    }

    public getMaterial(): string {
        return this.material;
    }

    public setMaterial(material: string): void {
        this.material = material;
    }

    public getEstante(): string {
        return this.estante;
    }

    public setEstante(estante: string): void {
        this.estante = estante;
    }

    public getLongitud1(): number {
        return this.longitud1;
    }

    public setLongitud1(longitud1: number): void {
        this.longitud1 = longitud1;
    }

    public getLongitud2(): number {
      return this.longitud2;
    }

    public setLongitud2(longitud2: number): void {
        this.longitud2 = longitud2;
    }

    public getLongitud3(): number {
      return this.longitud3;
    }

    public setLongitud3(longitud3: number): void {
      this.longitud3 = longitud3;
    }

    public getHojas(): number {
        return this.hojas;
    }

    public setHojas(hojas: number): void {
        this.hojas = hojas;
    }

    public getLote(): string {
        return this.lote;
    }

    public setLote(lote: string): void {
        this.lote = lote;
    }



}
