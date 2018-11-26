/// <reference path= "./animal.ts"/>

namespace mascota{
    export class Pajaro implements Animal{
        
        especie:string;
        nombre:string;
        edad:number;
        peso:number;
        plumas: Plumaje;
        

        constructor(nombre:string, edad:number, peso:number, plumas:Plumaje){
            this.especie = "pajaro";
            this.nombre = nombre;
            this.edad = edad;
            this.peso = peso;
            this.plumas = plumas;
        }

        

        hacerRuido():void{
            console.log("PioPio!!");
        }

        
        
    }
    export enum Plumaje {
        largas = 1,
        cortas
    }
}