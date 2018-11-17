/// <reference path= "./animal.ts"/>
var mascota;
(function (mascota) {
    var Gato = /** @class */ (function () {
        function Gato(nombre) {
            this.nombre = nombre;
        }
        Gato.prototype.hacerRuido = function () {
            console.log("Guaaau!!");
        };
        return Gato;
    }());
    mascota.Gato = Gato;
})(mascota || (mascota = {}));
