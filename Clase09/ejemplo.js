//HAY Q AGREGARLE PARAMETROS A LAS CLASES, PARA TENER MAS DATOS Q MOSTRAR
//TMB HAY Q AGREGAR BOTONES CON FUNCIONES REDUCE, FILTER, MAP PARA MODIFICAR LA TABLA.
/// <reference path= "./animal.ts"/>
/// <reference path= "./perro.ts"/>
/// <reference path= "./gato.ts"/>
/*
tsc --init            para iniciar en TS
tsc *.ts -w           para que se quede preparando los archivos en JS continuamente
tsc ejemplo.ts       para transpilar un archivo a JS
npm install @types/jquery --save     usar Jquery en TS

*/
var ejemplo;
(function (ejemplo) {
    $(document).ready(function () {
        $("#divAgregar").hide();
        Programa.completarTabla();
    });
    var Programa = /** @class */ (function () {
        function Programa() {
        }
        Programa.hablar = function (a) {
            console.log("Nombre: " + a.nombre);
            a.hacerRuido();
        };
        Programa.completarTabla = function () {
            var stringArrayJson = localStorage.getItem("listaJsonAnimales");
            $("#divTabla").append("hola"); // ACA AGREGAR LA TABLA PARA Q APAREZCA EN EL HTML
            console.log(stringArrayJson);
        };
        Programa.agregar = function () {
            $("#divAgregar").show();
        };
        Programa.guardar = function () {
            console.log($("#txtNombre").val());
            console.log($("#radio_gato").is(':checked'));
            if ($("#radio_gato").is(':checked')) {
                var gato = new mascota.Gato(String($("#txtNombre").val()));
                Programa.animales.push(gato);
                console.log(Programa.animales);
                console.log(gato);
            }
            else {
                var perro = new mascota.Perro(String($("#txtNombre").val()));
                Programa.animales.push(perro);
                console.log(Programa.animales);
                console.log(perro);
            }
        };
        Programa.accion = function () {
            console.log(Programa.animales);
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
            Programa.animales.push(perro);
            Programa.animales.push(gato);
            Programa.animales.forEach(Programa.hablar);
            var arrayObjJson = JSON.stringify(Programa.animales);
            console.log(arrayObjJson);
            localStorage.setItem("listaJsonAnimales", arrayObjJson);
            console.log(JSON.parse(arrayObjJson));
        };
        Programa.animales = new Array();
        return Programa;
    }());
    ejemplo.Programa = Programa;
})(ejemplo || (ejemplo = {}));
