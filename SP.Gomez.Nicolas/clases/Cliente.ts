/// <reference path= "./persona.ts"/>

namespace humano{
    export class Cliente extends  Persona{
        id:number;
        nombre:string;
        apellido:string;
        edad:number;
        sexo: Genero

        constructor(id:number, nombre:string, apellido:string, edad:number, sexo:Genero){
            super(id, nombre, apellido);
            this.edad = edad;            
            this.sexo = sexo;
        }

    }
    export enum Genero {
        Hombre = 1,
        Mujer
    }
}