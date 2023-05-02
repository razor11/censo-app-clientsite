/* Definicion entidad votantes */

export interface Votantes {
  id: string;
  identidad: string;
  firstName: string;
  lastName: string;
  gender: number;
  birthDate: Date;
  phoneNumber: string;
  country: number;
  neighborhood:number;
  necesidadesPrimaria:number;
  necesidadesPrimariasEspecifica:number;
  DescripcionProblematica:number;
  identityStatus: number;
  responsable: string;
}

export interface Votante{

}


