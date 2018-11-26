/// <reference path= "./animal.ts"/>
var mascota;
(function (mascota) {
    var Pajaro = /** @class */ (function () {
        function Pajaro(nombre, edad, peso, plumas) {
            this.especie = "pajaro";
            this.nombre = nombre;
            this.edad = edad;
            this.peso = peso;
            this.plumas = plumas;
        }
        Pajaro.prototype.hacerRuido = function () {
            console.log("PioPio!!");
        };
        return Pajaro;
    }());
    mascota.Pajaro = Pajaro;
    var Plumaje;
    (function (Plumaje) {
        Plumaje[Plumaje["largas"] = 1] = "largas";
        Plumaje[Plumaje["cortas"] = 2] = "cortas";
    })(Plumaje = mascota.Plumaje || (mascota.Plumaje = {}));
})(mascota || (mascota = {}));
