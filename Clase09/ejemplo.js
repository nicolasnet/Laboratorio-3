/// <reference path= "./animal.ts"/>
/// <reference path= "./perro.ts"/>
/// <reference path= "./gato.ts"/>
var ejemplo;
(function (ejemplo) {
    var Programa = /** @class */ (function () {
        function Programa() {
            this.animales = new Array();
        }
        Programa.hablar = function (a) {
            console.log("Nombre: " + a.nombre);
            a.hacerRuido();
        };
        Programa.guardar = function () {
            console.log($("#txtNuevo").val());
            console.log($("#radio_gato").is(':checked'));
        };
        Programa.accion = function () {
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
            var gato = new mascota.Gato("kiti");
            var perro = new mascota.Perro("tom");
            //hablar(perro);
            //hablar(gato);            
            var prog = new Programa();
            prog.animales.push(perro, gato);
            prog.animales.push(gato);
            prog.animales.forEach(Programa.hablar);
        };
        return Programa;
    }());
    ejemplo.Programa = Programa;
})(ejemplo || (ejemplo = {}));
