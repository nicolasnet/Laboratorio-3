/// <reference path= "./animal.ts"/>

namespace mascota{
    export class Gato implements Animal{
        nombre:string;

        constructor(nombre:string){
            this.nombre = nombre;
        }

        hacerRuido():void{
            console.log("Guaaau!!");
        }
    }
}