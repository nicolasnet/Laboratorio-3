var humano;
(function (humano) {
    var Persona = /** @class */ (function () {
        function Persona(id, nombre, apellido) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
        }
        return Persona;
    }());
    humano.Persona = Persona;
})(humano || (humano = {}));
