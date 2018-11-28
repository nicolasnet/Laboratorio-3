<<<<<<< HEAD
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
=======
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
>>>>>>> fa4a4f871082096d7ea124887466888c5310e7b2
