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
        $("#btnVerColumnas").click(Programa.verColumnas);
        $("#btnPlumasCortas").click(function() {Programa.muestraPlumas(2)});
        $("#btnPlumasLargas").click(function() {Programa.muestraPlumas(1)});

        $("#thColEspecie").dblclick(function(){Programa.columnaOcultar("Especie")});
        $("#thColNombre").dblclick(function(){Programa.columnaOcultar("Nombre")});
        $("#thColEdad").dblclick(function(){Programa.columnaOcultar("Edad")});
        $("#thColPeso").dblclick(function(){Programa.columnaOcultar("Peso")});
        $("#thColPlumas").dblclick(function(){Programa.columnaOcultar("plumas")});

    });


    export class Programa{        

        static animales = new Array<mascota.Animal>();
        static indexGlobal:number;

//#region funciones genericas
        static verColumnas(){
            //console.log("Esta funcionando el cambio");
            $("th").show();
            $("td").show();
        }

        static columnaOcultar(columna:string) {
            $("td[name=col"+Programa.mayusPrimera(columna)+"]").hide();
            $("#thCol"+Programa.mayusPrimera(columna)).hide();
        }


        static mostrar(id:string){
            $("#"+id).show();
        }

        static ocultar(id:string){
            $("#"+id).hide();
        }

        static mayusPrimera(texto:string):string{
            return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
        }
//#endregion


        
        static accion(){                    
/*
            //solo se guardan STRING en localStorage y sessionStorage
            localStorage.setItem("clave", "valor");//esto lo guarda en archivos temporales locales, se mantienen por mas q se cierre el navegador
            //sessionStorage.setItem("clave", "valor"); //esto lo guardo en una pestaña del navegador
            
            
            //window.location; // trae la ubicacion completa de donde estamos
            window.location.href="./index2.html"; //cambiamos la referencia a un nuevo html
            alert(localStorage.getItem("clave"));
*/
            Programa.animales.forEach(Programa.hablar);
        }


        static hablar(a:mascota.Animal){
            console.log("Nombre: "+a.nombre);
            a.hacerRuido();
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


        static inicioModalAgregar(){
            Programa.vaciarForm();
            Programa.mostrar("btnGuardar");
            Programa.ocultar("btnEliminar");
            Programa.ocultar("btnModificar");
            Programa.ocultar("divPlumas");
            //$("#modalAgregar").slideToggle();
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
            $("#txtNombre").removeClass("sindato");
            $("#nmbEdad").removeClass("sindato");
            $("#nmbPeso").removeClass("sindato");

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
                    $("#tBodyAnimales").append("<tr id=tr" + index.toString() + ">  <td name='colEspecie'>"+value.especie+"</td>  <td name='colNombre'>"+value.nombre+"</td>  <td name='colEdad'>"+value.edad+"</td> <td name='colPeso'>"+value.peso+"</td> <td name='colPlumas'>"+plumas+"</td>  </tr> "); // ACA AGREGAR LA TABLA PARA Q APAREZCA EN EL HTML
                    $("#tr"+index.toString()).dblclick(function(){Programa.abrirModalEditado(index)});
                    $("#thColEspecie").dblclick(function(){$('td[name=tcol1]').hide()});
                });
                Programa.completarArrayLocalStorage("listaJsonAnimales");
            }
            
        }


        
        static tomarDatosForm():any{
            var animal: mascota.Animal;

            var datosCompletos:boolean = true;

            if($("#txtNombre").val() == ""){                
                $("#txtNombre").addClass("sindato");
                datosCompletos = false;
                alert("completar Nombre");
            }

            if($("#nmbEdad").val() == ""){                
                $("#nmbEdad").addClass("sindato");
                alert("completar Edad");
                datosCompletos = false;
            }

            if($("#nmbPeso").val() == ""){                
                $("#nmbPeso").addClass("sindato");
                alert("completar Peso");
                datosCompletos = false;                
            }


            if(datosCompletos){
                if($("#radio_gato").is(':checked')){                
                    var animal:mascota.Gato = new mascota.Gato(Programa.mayusPrimera(String($("#txtNombre").val())), Number($("#nmbEdad").val()), Number($("#nmbPeso").val()));                
                }

                if($("#radio_perro").is(':checked')){
                    var animal:mascota.Perro = new mascota.Perro(Programa.mayusPrimera(String($("#txtNombre").val())), Number($("#nmbEdad").val()), Number($("#nmbPeso").val()));                
                }

                if($("#radio_pajaro").is(':checked')){
                    var animal:mascota.Perro = new mascota.Pajaro(Programa.mayusPrimera(String($("#txtNombre").val())), Number($("#nmbEdad").val()), Number($("#nmbPeso").val()), Number($("#selectPlumas").val()));                
                }
            }
            else{
                return null;
            }

            return animal;
        }



        static guardarLocalStorage(claveLocalStorage:string){
            var arrayObjJson = JSON.stringify(Programa.animales);
            localStorage.setItem(claveLocalStorage, arrayObjJson);
        }

//#region ABM
        static guardar(){
            var animal = Programa.tomarDatosForm();
            
            if(animal != null){
                Programa.animales.push(animal);         

                Programa.guardarLocalStorage("listaJsonAnimales");
                Programa.completarTablaLocalStorage("listaJsonAnimales");

                Programa.vaciarForm();
                $("#btnGuardar").attr("data-dismiss","modal");
            }
            else{
                $("#btnGuardar").removeAttr("data-dismiss");
            }
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
//#endregion



//#region Filter, map, reduce
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

        static muestraPlumas(plumas:number){
            var ejemplo = Programa.animales.filter(function(item){
                return item.especie == "pajaro" && item.plumas==plumas;
            }).map(function(item){
                return {name: item.nombre};
            });
            console.log(ejemplo);
        }
//#endregion

    }
}

