//HAY Q AGREGARLE PARAMETROS A LAS CLASES, PARA TENER MAS DATOS Q MOSTRAR
//TMB HAY Q AGREGAR BOTONES CON FUNCIONES REDUCE, FILTER, MAP PARA MODIFICAR LA TABLA.
/// <reference path= "./animal.ts"/>
/// <reference path= "./perro.ts"/>
/// <reference path= "./gato.ts"/>
/// <reference path= "./pajaro.ts"/>
/*
tsc --init            para iniciar en TS
tsc *.ts -w           para que se quede preparando los archivos en JS continuamente
tsc ejemplo.ts       para transpilar un archivo a JS
npm install @types/jquery --save     usar Jquery en TS

*/
var ejemplo;
(function (ejemplo) {
    $(document).ready(function () {
        Programa.completarTablaLocalStorage("listaJsonAnimales");
        $("#divPlumas").hide();
        $("#radio_gato").click(function () { Programa.ocultar("divPlumas"); });
        $("#radio_perro").click(function () { Programa.ocultar("divPlumas"); });
        $("#radio_pajaro").click(function () { Programa.mostrar("divPlumas"); });
        $("#btnHablar").click(Programa.accion);
        $("#btnGuardar").click(Programa.guardar);
        $("#selectFiltro").change(Programa.filtradoEspecie);
    });
    var Programa = /** @class */ (function () {
        function Programa() {
        }
        Programa.mostrar = function (id) {
            $("#" + id).show();
        };
        Programa.ocultar = function (id) {
            $("#" + id).hide();
        };
        Programa.mayusPrimera = function (texto) {
            return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
        };
        Programa.JsonToAnimal = function (stringArrayJson) {
            var animales = new Array();
            var arrayJson = JSON.parse(String(stringArrayJson));
            arrayJson.forEach(function (value) {
                switch (value.especie) {
                    case "perro":
                        var perro = new mascota.Perro(Programa.mayusPrimera(String(value.nombre)), Number(value.edad), Number(value.peso));
                        animales.push(perro);
                        break;
                    case "gato":
                        var gato = new mascota.Gato(Programa.mayusPrimera(String(value.nombre)), Number(value.edad), Number(value.peso));
                        animales.push(gato);
                        break;
                    case "pajaro":
                        var pajaro = new mascota.Pajaro(Programa.mayusPrimera(String(value.nombre)), Number(value.edad), Number(value.peso), Number(value.plumas));
                        animales.push(pajaro);
                        break;
                }
            });
            return animales;
        };
        Programa.vaciarForm = function () {
            $("#txtNombre").val("");
            $("#nmbEdad").val("");
            $("#nmbPeso").val("");
            $("#radio_gato").prop("checked", true);
            $("#txtNombre").removeClass("sindato");
            $("#nmbEdad").removeClass("sindato");
            $("#nmbPeso").removeClass("sindato");
        };
        Programa.completarArrayLocalStorage = function (claveLocalStorage) {
            var stringArrayJson = localStorage.getItem(claveLocalStorage);
            Programa.animales = Programa.JsonToAnimal(String(stringArrayJson));
        };
        Programa.completarTablaLocalStorage = function (claveLocalStorage) {
            Programa.completarArrayLocalStorage(claveLocalStorage);
            //console.log(Programa.animales);
            $("#tBodyAnimales").text("");
            Programa.animales.forEach(function (value) {
                var plumas;
                if (value.plumas != null) {
                    plumas = mascota.Plumaje[value.plumas];
                }
                else {
                    plumas = "-";
                }
                $("#tBodyAnimales").append("<tr >  <td>" + value.especie + "</td>  <td>" + value.nombre + "</td>  <td>" + value.edad + "</td> <td>" + value.peso + "</td> <td>" + plumas + "</td>  </tr> "); // ACA AGREGAR LA TABLA PARA Q APAREZCA EN EL HTML
            });
            Programa.completarArrayLocalStorage("listaJsonAnimales");
        };
        Programa.hablar = function (a) {
            console.log("Nombre: " + a.nombre);
            a.hacerRuido();
        };
        Programa.guardar = function () {
            //console.log ($("#txtNombre").val());
            //console.log( $("#radio_gato").is(':checked'));
            if ($("#txtNombre").val() == "") {
                $("#txtNombre").addClass("sindato");
                alert("completar Nombre");
            }
            if ($("#nmbEdad").val() == "") {
                $("#nmbEdad").addClass("sindato");
                alert("completar Edad");
            }
            if ($("#nmbPeso").val() == "") {
                $("#nmbPeso").addClass("sindato");
                alert("completar Peso");
            }
            if ($("#radio_gato").is(':checked')) {
                var gato = new mascota.Gato(Programa.mayusPrimera(String($("#txtNombre").val())), Number($("#nmbEdad").val()), Number($("#nmbPeso").val()));
                Programa.animales.push(gato);
                console.log(Programa.animales);
                console.log(gato);
            }
            if ($("#radio_perro").is(':checked')) {
                var perro = new mascota.Perro(Programa.mayusPrimera(String($("#txtNombre").val())), Number($("#nmbEdad").val()), Number($("#nmbPeso").val()));
                Programa.animales.push(perro);
                console.log(Programa.animales);
                console.log(perro);
            }
            if ($("#radio_pajaro").is(':checked')) {
                var perro = new mascota.Pajaro(Programa.mayusPrimera(String($("#txtNombre").val())), Number($("#nmbEdad").val()), Number($("#nmbPeso").val()), Number($("#selectPlumas").val()));
                Programa.animales.push(perro);
                console.log(Programa.animales);
                console.log(perro);
            }
            var arrayObjJson = JSON.stringify(Programa.animales);
            localStorage.setItem("listaJsonAnimales", arrayObjJson);
            //Programa.ocultar("modalAgregar");
            Programa.completarTablaLocalStorage("listaJsonAnimales");
            Programa.vaciarForm();
        };
        Programa.accion = function () {
            //console.log(Programa.animales);
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
            /*
            var gato:mascota.Gato = new mascota.Gato("kiti");
            var perro:mascota.Perro = new mascota.Perro("tom");
            */
            //hablar(perro);
            //hablar(gato);            
            /*
            Programa.animales.push(perro);
            Programa.animales.push(gato);
            */
            Programa.animales.forEach(Programa.hablar);
            /*
                        var arrayObjJson = JSON.stringify(Programa.animales);
                        console.log(arrayObjJson);
                        localStorage.setItem("listaJsonAnimales", arrayObjJson);
            
                        console.log( JSON.parse(arrayObjJson));
            */
        };
        Programa.filtradoEspecie = function () {
            var opcion = Number($("#selectFiltro").val());
            console.log(opcion);
            var listaFiltrada = new Array();
            switch (opcion) {
                case 1:
                    listaFiltrada = Programa.animales.filter(function (animal) {
                        return animal.especie == "gato"; //--> returna un bool, lo q sea true lo guarda en la nueva lista,
                    });
                    break;
                case 2:
                    listaFiltrada = Programa.animales.filter(function (animal) {
                        return animal.especie == "perro"; //--> returna un bool, lo q sea true lo guarda en la nueva lista,
                    });
                    break;
                case 3:
                    listaFiltrada = Programa.animales.filter(function (animal) {
                        return animal.especie == "pajaro"; //--> returna un bool, lo q sea true lo guarda en la nueva lista,
                    });
                    break;
                default:
                    listaFiltrada = Programa.animales;
                    break;
            }
            localStorage.setItem("listaFiltrada", JSON.stringify(listaFiltrada));
            Programa.completarTablaLocalStorage("listaFiltrada");
        };
        Programa.animales = new Array();
        return Programa;
    }());
    ejemplo.Programa = Programa;
})(ejemplo || (ejemplo = {}));
