/// <reference path= "./animal.ts"/>
var mascota;
(function (mascota) {
    var Perro = /** @class */ (function () {
        function Perro(nombre, edad, peso) {
            this.especie = "perro";
            this.nombre = nombre;
            this.edad = edad;
            this.peso = peso;
        }
        Perro.prototype.hacerRuido = function () {
            console.log("Guaaau!!");
        };
        return Perro;
    }());
    mascota.Perro = Perro;
})(mascota || (mascota = {}));
