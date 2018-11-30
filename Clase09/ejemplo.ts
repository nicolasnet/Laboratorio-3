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



namespace ejemplo{

    $(document).ready(function(){
        Programa.completarTablaLocalStorage("listaJsonAnimales");
        $("#btnAgregar").click(Programa.inicioModalAgregar);
        $("#radio_gato").click(function(){ Programa.ocultar("divPlumas")});     
        $("#radio_perro").click(function(){ Programa.ocultar("divPlumas")});
        $("#radio_pajaro").click(function(){ Programa.mostrar("divPlumas")});
        $("#btnHablar").click(Programa.accion);
        $("#btnGuardar").click(Programa.guardar);
        $("#selectFiltro").change(Programa.filtradoEspecie);
        $("#btnEliminar").click(Programa.eliminar);
        $("#btnModificar").click(Programa.modificar);
        $("#btnPromEdad").click(Programa.promedioEdad);
        $("#btnPromPeso").click(Programa.promedioPeso);
        $("#thColespecie").click(function(){$("td[name=colEspecie]").hide()});
    });


    export class Programa{        

        static animales = new Array<mascota.Animal>();
        static indexGlobal:number;


        static mostrar(id:string){
            $("#"+id).show();
        }

        static ocultar(id:string){
            $("#"+id).hide();
        }

        static mayusPrimera(texto:string):string{
            return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
        }




        static inicioModalAgregar(){
            Programa.vaciarForm();
            Programa.mostrar("btnGuardar");
            Programa.ocultar("btnEliminar");
            Programa.ocultar("btnModificar");
            Programa.ocultar("divPlumas");
        }


        static JsonToAnimal(stringArrayJson:string):Array<mascota.Animal>{
            var animales = new Array<mascota.Animal>();
            var arrayJson = JSON.parse(String(stringArrayJson));

            arrayJson.forEach(function (value:any) {

                switch (value.especie) {
                    case "perro":
                        var perro:mascota.Perro = new mascota.Perro(Programa.mayusPrimera(String(value.nombre)), Number(value.edad), Number(value.peso));
                        animales.push(perro);
                        break;

                    case "gato":
                        var gato:mascota.Gato = new mascota.Gato(Programa.mayusPrimera(String(value.nombre)), Number(value.edad), Number(value.peso));
                        animales.push(gato);
                        break;
                    case "pajaro":
                        var pajaro:mascota.Pajaro = new mascota.Pajaro(Programa.mayusPrimera(String(value.nombre)), Number(value.edad), Number(value.peso), Number(value.plumas));
                        animales.push(pajaro);
                        break;                
                }
            });

            return animales;
        }


        static vaciarForm(){
            $("#txtNombre").val("");
            $("#nmbEdad").val("");
            $("#nmbPeso").val("");
            $("#radio_gato").prop("checked", true);

            $("#txtNombre").removeClass("sindato");
            $("#nmbEdad").removeClass("sindato");
            $("#nmbPeso").removeClass("sindato");            
        }


        static completarModalAgregar(index:number){
            
            $("#txtNombre").val(Programa.animales[index].nombre);
            $("#nmbEdad").val(Programa.animales[index].edad);
            $("#nmbPeso").val(Programa.animales[index].peso);
            switch(Programa.animales[index].especie){
                case "perro":
                    $("#radio_perro").prop("checked", true);
                    Programa.ocultar("divPlumas")
                    break;
                case "gato":
                    $("#radio_gato").prop("checked", true);
                    Programa.ocultar("divPlumas")
                    break;
                case "pajaro":
                    $("#radio_pajaro").prop("checked", true);
                    $("#selectPlumas").val(Programa.animales[index].plumas);
                    Programa.mostrar("divPlumas");
                    break;
            }
        }

        
        static completarArrayLocalStorage(claveLocalStorage:string):boolean{
            var stringArrayJson = localStorage.getItem(claveLocalStorage);
            if(stringArrayJson != null){
                Programa.animales = Programa.JsonToAnimal(String(stringArrayJson));
                return true;
            }else{
                return false;
            }

        }


        static completarTablaLocalStorage(claveLocalStorage:string){

            if(Programa.completarArrayLocalStorage(claveLocalStorage)){
                
                $("#tBodyAnimales").text("");
                
                Programa.animales.forEach(function (value:any, index:number) {
                    
                    var plumas;
                    if(value.plumas != null){
                        plumas = mascota.Plumaje[value.plumas];
                    }
                    else{
                        plumas = "-";
                    }
                    $("#tBodyAnimales").append("<tr id=tr" + index.toString() + ">  <td name='colEspecie'>"+value.especie+"</td>  <td>"+value.nombre+"</td>  <td>"+value.edad+"</td> <td>"+value.peso+"</td> <td>"+plumas+"</td>  </tr> "); // ACA AGREGAR LA TABLA PARA Q APAREZCA EN EL HTML
                    $("#tr"+index.toString()).dblclick(function(){Programa.abrirModalEditado(index)});
                    $("#thColEspecie").dblclick(function(){$('td[name=tcol1]').hide()});
                });
                Programa.completarArrayLocalStorage("listaJsonAnimales");
            }
            
        }

        

        static hablar(a:mascota.Animal){
            console.log("Nombre: "+a.nombre);
            a.hacerRuido();
        }       
        
        

        static guardar(){
            Programa.animales.push(Programa.tomarDatosForm());            

            Programa.guardarLocalStorage("listaJsonAnimales");
            Programa.completarTablaLocalStorage("listaJsonAnimales");

            Programa.vaciarForm();
        }


        static tomarDatosForm():mascota.Animal{
            var animal: mascota.Animal;

            if($("#txtNombre").val() == ""){                
                $("#txtNombre").addClass("sindato");
                alert("completar Nombre");
            }

            if($("#nmbEdad").val() == ""){                
                $("#nmbEdad").addClass("sindato");
                alert("completar Edad");
            }

            if($("#nmbPeso").val() == ""){                
                $("#nmbPeso").addClass("sindato");
                alert("completar Peso");                
            }



            if($("#radio_gato").is(':checked')){                
                var animal:mascota.Gato = new mascota.Gato(Programa.mayusPrimera(String($("#txtNombre").val())), Number($("#nmbEdad").val()), Number($("#nmbPeso").val()));                
            }

            if($("#radio_perro").is(':checked')){
                var animal:mascota.Perro = new mascota.Perro(Programa.mayusPrimera(String($("#txtNombre").val())), Number($("#nmbEdad").val()), Number($("#nmbPeso").val()));                
            }

            if($("#radio_pajaro").is(':checked')){
                var animal:mascota.Perro = new mascota.Pajaro(Programa.mayusPrimera(String($("#txtNombre").val())), Number($("#nmbEdad").val()), Number($("#nmbPeso").val()), Number($("#selectPlumas").val()));                
            }

            return animal;
        }



        static guardarLocalStorage(claveLocalStorage:string){
            var arrayObjJson = JSON.stringify(Programa.animales);
            localStorage.setItem(claveLocalStorage, arrayObjJson);
        }



        

        static accion(){
            
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
        }


        static filtradoEspecie(){
            var opcion:number = Number($("#selectFiltro").val());
            var listaFiltrada = new Array<mascota.Animal>();
            switch(opcion){
                case 1:
                    listaFiltrada = Programa.animales.filter(function(animal){
                        return animal.especie == "gato"; //--> returna un bool, lo q sea true lo guarda en la nueva lista,
                    });
                    break;

                case 2:
                    listaFiltrada = Programa.animales.filter(function(animal){
                        return animal.especie == "perro"; //--> returna un bool, lo q sea true lo guarda en la nueva lista,
                    });
                    break;

                case 3:
                    listaFiltrada = Programa.animales.filter(function(animal){
                        return animal.especie == "pajaro"; //--> returna un bool, lo q sea true lo guarda en la nueva lista,
                    });
                    break;
                default:
                    listaFiltrada = Programa.animales;
                    break;
            }
            

            localStorage.setItem("listaFiltrada", JSON.stringify(listaFiltrada));
            Programa.completarTablaLocalStorage("listaFiltrada");
        }



        static abrirModalEditado(index:number){
            console.log(index);
            Programa.indexGlobal = index;
            $("#modalAgregar").modal("show");
            Programa.ocultar("btnGuardar");
            Programa.mostrar("btnEliminar");
            Programa.mostrar("btnModificar");
            Programa.completarModalAgregar(index);
        }

        static eliminar(){
            if(confirm("Seguro desea eliminar este animal?")){
                Programa.animales.splice(Programa.indexGlobal,1);
                Programa.guardarLocalStorage("listaJsonAnimales");
                Programa.completarTablaLocalStorage("listaJsonAnimales");
                //Programa.ocultar("btnEliminar");
                //Programa.mostrar("btnGuardar");
            }
        }

        static modificar(){
            Programa.animales.splice(Programa.indexGlobal,1,Programa.tomarDatosForm());
            Programa.guardarLocalStorage("listaJsonAnimales");
            Programa.completarTablaLocalStorage("listaJsonAnimales");
            Programa.vaciarForm();
        }

        static promedioEdad(){
            var promedio:number = Programa.animales.reduce(function(total, item){
                return total += item.edad;
            },0)/Programa.animales.length;

            alert("Promedio de edad: "+promedio);
        }

        static promedioPeso(){
            var promedio:number = Programa.animales.reduce(function(total, item){
                return total += item.peso;
            },0)/Programa.animales.length;

            alert("Promedio de peso: "+promedio);
        }

    }
}

