/// <reference path= "./animal.ts"/>
/// <reference path= "./perro.ts"/>
/// <reference path= "./gato.ts"/>

namespace ejemplo{
    export class Programa{
        
        animales = new Array<mascota.Animal>();
        
        static hablar(a:mascota.Animal){
            console.log("Nombre: "+a.nombre);
            a.hacerRuido();
        }     

        static guardar(){
            console.log ($("#txtNuevo").val());
        }

        static accion(){
            
            localStorage.setItem("clave", "valor");

            alert(localStorage.getItem("clave"));
            var gato:mascota.Gato = new mascota.Gato("kiti");
            var perro:mascota.Perro = new mascota.Perro("tom");
 
            //hablar(perro);
            //hablar(gato);            
            
            var prog = new Programa();

            prog.animales.push(perro, gato);
            prog.animales.push(gato);

            prog.animales.forEach(Programa.hablar);

            
        }
    }
}

