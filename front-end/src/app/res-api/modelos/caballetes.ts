export interface Caballetes {
  name: string;    // Almacen Principal
  type: string;

  /* Los 1ºstores pueden ser clasificadores, o caballetes sueltos */
  stores: ({name: string,
            type: string,

            /*Los clasificadores estan formados por varios caballetes */
            stores: {name: string, type: string}[]}
          | {name: string, type: string})[];
}
