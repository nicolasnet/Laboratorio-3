/// <reference path= "./animal.ts"/>

namespace mascota{
    export class Perro implements Animal{
        nombre:string;

        constructor(nombre:string){
            this.nombre = nombre;
        }

        hacerRuido():void{
            console.log("Guaaau!!");
        }
    }
}