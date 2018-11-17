/// <reference path= "./animal.ts"/>
var mascota;
(function (mascota) {
    var Perro = /** @class */ (function () {
        function Perro(nombre) {
            this.nombre = nombre;
        }
        Perro.prototype.hacerRuido = function () {
            console.log("Guaaau!!");
        };
        return Perro;
    }());
    mascota.Perro = Perro;
})(mascota || (mascota = {}));
