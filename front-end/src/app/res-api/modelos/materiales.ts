export interface Materiales {
  name: string;    // Almacen Principal
  description: string;

  /* La agrupacion de un tipo de material(ej. Cristal), contiene varios sub-tipos (ej. FL_05,FL_06...) */
  materials: {name: string, description: string}[];
}
