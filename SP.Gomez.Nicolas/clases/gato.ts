/// <reference path= "./animal.ts"/>

namespace mascota{
    export class Gato implements Animal{
        especie:string;
        nombre:string;
        edad:number;
        peso:number;


        constructor(nombre:string, edad:number, peso:number){
            this.especie = "gato";
            this.nombre = nombre;
            this.edad = edad;
            this.peso = peso;
        }

        hacerRuido():void{
            console.log("Miauuu!!");
        }
    }
}