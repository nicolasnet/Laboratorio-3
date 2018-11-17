/// <reference path= "./animal.ts"/>
/// <reference path= "./perro.ts"/>
/// <reference path= "./gato.ts"/>

/*
tsc --init            para iniciar en TS
tsc *.ts -w           para que se quede preparando los archivos en JS continuamente
tsc ejemplo.ts       para transpilar un archivo a JS
npm install @types/jquery --save     usar Jquery en TS

*/
namespace ejemplo{
    export class Programa{
        
        animales = new Array<mascota.Animal>();
        
        static hablar(a:mascota.Animal){
            console.log("Nombre: "+a.nombre);
            a.hacerRuido();
        }     

        static guardar(){
            console.log ($("#txtNuevo").val());
            console.log( $("#radio_gato").is(':checked'));
        }

        static accion(){

            /*
            podemos guardar los datos de los animales en el localstorage para dsp agarrarlos desde otra funcion
            */
/*
            //solo se guardan STRING en localStorage y sessionStorage
            localStorage.setItem("clave", "valor");//esto lo guarda en archivos temporales locales, se mantienen por mas q se cierre el navegador
            //sessionStorage.setItem("clave", "valor"); //esto lo guardo en una pestaña del navegador
            
            
            //window.location; // trae la ubicacion completa de donde estamos
            window.location.href="./index2.html"; //cambiamos la referencia a un nuevo html
            alert(localStorage.getItem("clave"));
*/
            


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

