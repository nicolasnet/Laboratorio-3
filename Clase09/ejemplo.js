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
        };
        Programa.accion = function () {
            localStorage.setItem("clave", "valor");
            alert(localStorage.getItem("clave"));
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
