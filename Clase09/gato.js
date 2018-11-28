<<<<<<< HEAD
/// <reference path= "./animal.ts"/>
var mascota;
(function (mascota) {
    var Gato = /** @class */ (function () {
        function Gato(nombre, edad, peso) {
            this.especie = "gato";
            this.nombre = nombre;
            this.edad = edad;
            this.peso = peso;
        }
        Gato.prototype.hacerRuido = function () {
            console.log("Miauuu!!");
        };
        return Gato;
    }());
    mascota.Gato = Gato;
})(mascota || (mascota = {}));
=======
/// <reference path= "./animal.ts"/>
var mascota;
(function (mascota) {
    var Gato = /** @class */ (function () {
        function Gato(nombre, edad, peso) {
            this.especie = "gato";
            this.nombre = nombre;
            this.edad = edad;
            this.peso = peso;
        }
        Gato.prototype.hacerRuido = function () {
            console.log("Miauuu!!");
        };
        return Gato;
    }());
    mascota.Gato = Gato;
})(mascota || (mascota = {}));
>>>>>>> fa4a4f871082096d7ea124887466888c5310e7b2
