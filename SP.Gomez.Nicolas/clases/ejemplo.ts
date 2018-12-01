/// <reference path= "./persona.ts"/>
/// <reference path= "./cliente.ts"/>

/*
tsc --init            para iniciar en TS
tsc *.ts -w           para que se quede preparando los archivos en JS continuamente
tsc ejemplo.ts       para transpilar un archivo a JS
npm install @types/jquery --save     usar Jquery en TS

*/



namespace ejemplo{

    $(document).ready(function(){
        Programa.completarTablaLocalStorage("listaJsonclientes");
        $("#btnAgregar").click(Programa.inicioModalAgregar);        
        $("#btnGuardar").click(Programa.guardar);
        $("#selectFiltro").change(Programa.filtradoSexo);
        $("#btnEliminar").click(Programa.eliminar);
        $("#btnPromEdad").click(Programa.promedioEdad);
        $("#btnModificar").click(Programa.modificar); 
        $("#btnLimpiar").click(Programa.limpiar);
        $("#btnMayores").click(function(){ Programa.muestraMayores(1)});

        $("#chkNombre").change(function(){Programa.columnaOcultar("Nombre")});
        $("#chkApellido").change(function(){Programa.columnaOcultar("Apellido")});
        $("#chkEdad").change(function(){Programa.columnaOcultar("Edad")});
        $("#chkId").change(function(){Programa.columnaOcultar("Id")});
        $("#chkSexo").change(function(){Programa.columnaOcultar("Sexo")});
    });


    export class Programa{        

        static clientes = new Array<humano.Cliente>();
        static indexGlobal:number;

//#region funciones genericas
        static verColumnas(){
            //console.log("Esta funcionando el cambio");
            $("th").show();
            $("td").show();
        }

        static columnaOcultar(columna:string) {
            if($("#chk"+columna).prop("checked")){
                $("td[name=col"+Programa.mayusPrimera(columna)+"]").show();
                $("#thCol"+Programa.mayusPrimera(columna)).show();
            }else{
                $("td[name=col"+Programa.mayusPrimera(columna)+"]").hide();
                $("#thCol"+Programa.mayusPrimera(columna)).hide();
            }
            
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

        static limpiar(){
            localStorage.clear();
        }

        static JsonToPersona(stringArrayJson:string):Array<humano.Cliente>{
            var clientes = new Array<humano.Cliente>();
            var arrayJson = JSON.parse(String(stringArrayJson));

            arrayJson.forEach(function (value:any) {
                var cliente:humano.Cliente = new humano.Cliente(value.id, Programa.mayusPrimera(String(value.nombre)), Programa.mayusPrimera(String(value.apellido)), Number(value.edad), Number(value.sexo));
                clientes.push(cliente);
            });

            return clientes;
        }


        static inicioModalAgregar(){
            Programa.vaciarForm();
            Programa.mostrar("btnGuardar");
            Programa.ocultar("btnEliminar");
            Programa.ocultar("btnModificar");
        }

        
        static vaciarForm(){
            $("#txtNombre").val("");
            $("#nmbEdad").val("");
            $("#txtApellido").val("");
            $("#nbmId").val("");

            $("#txtNombre").removeClass("sindato");
            $("#nmbEdad").removeClass("sindato");
            $("#txtApellido").removeClass("sindato");            
        }


        static completarModalAgregar(index:number){
            $("#txtNombre").removeClass("sindato");
            $("#nmbEdad").removeClass("sindato");
            $("#txtApellido").removeClass("sindato");
            Programa.mostrar("btnModificar");
            
            $("#nmbId").val(Programa.clientes[index].id);
            $("#txtNombre").val(Programa.clientes[index].nombre);
            $("#nmbEdad").val(Programa.clientes[index].edad);
            $("#txtApellido").val(Programa.clientes[index].apellido);

            switch(Programa.clientes[index].sexo){
                case 1:
                    $("#selectSexo").val(1);
                    break;
                case 2:
                    $("#selectSexo").val(2);
                    break;
            }
        }

        
        static completarArrayLocalStorage(claveLocalStorage:string):boolean{
            var stringArrayJson = localStorage.getItem(claveLocalStorage);
            if(stringArrayJson != null){
                Programa.clientes = Programa.JsonToPersona(String(stringArrayJson));                
                return true;
            }else{
                return false;
            }

        }


        static completarTablaLocalStorage(claveLocalStorage:string){

            if(Programa.completarArrayLocalStorage(claveLocalStorage)){
                
                $("#tBodyClientes").text("");
                
                Programa.clientes.forEach(function (value:any, index:number) {
                    
                    $("#tBodyClientes").append("<tr id=tr" + value.id.toString() + ">  <td name='colId'>"+value.id+"</td>  <td name='colNombre'>"+value.nombre+"</td> <td name='colApellido'>"+value.apellido+"</td>  <td name='colEdad'>"+value.edad+"</td> <td name='colSexo'>"+humano.Genero[value.sexo]+"</td> </tr> ");
                    $("#tr"+value.id.toString()).dblclick(function(){Programa.abrirModalEditado(index)});
                    //$("#thColEspecie").dblclick(function(){$('td[name=tcol1]').hide()});
                });
                Programa.completarArrayLocalStorage("listaJsonclientes");
            }
            
        }


        
        static tomarDatosForm():any{
            var cliente: humano.Cliente;

            var datosCompletos:boolean = true;

            var id:number = Programa.clientes.reduce(function(total, item){
                if(total<item.id){
                  return total=item.id;
                }
                else
                  return total;
              },0)+1;

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

            if($("#txtApellido").val() == ""){                
                $("#txtApellido").addClass("sindato");
                alert("completar Peso");
                datosCompletos = false;                
            }

            if(datosCompletos){                                
                var cliente:humano.Cliente = new humano.Cliente(id, Programa.mayusPrimera(String($("#txtNombre").val())),Programa.mayusPrimera(String($("#txtApellido").val())), Number($("#nmbEdad").val()), Number($("#selectSexo").val()));                
            }
            else{
                return null;
            }

            return cliente;
        }



        static guardarLocalStorage(claveLocalStorage:string){
            var arrayObjJson = JSON.stringify(Programa.clientes);
            localStorage.setItem(claveLocalStorage, arrayObjJson);
        }

//#region ABM
        static guardar(){
            var cliente = Programa.tomarDatosForm();
            
            if(cliente != null){
                Programa.clientes.push(cliente);        

                Programa.guardarLocalStorage("listaJsonclientes");
                Programa.completarTablaLocalStorage("listaJsonclientes");

                Programa.vaciarForm();
                $("#btnGuardar").attr("data-dismiss","modal");
            }
            else{
                $("#btnGuardar").removeAttr("data-dismiss");
            }
        }


        static abrirModalEditado(index:number){
            Programa.indexGlobal = index;
            $("#modalAgregar").modal("show");
            Programa.ocultar("btnGuardar");
            Programa.mostrar("btnEliminar");
            Programa.completarModalAgregar(index);
        }

        static eliminar(){
            if(confirm("Seguro desea eliminar este cliente?")){
                Programa.clientes.splice(Programa.indexGlobal,1);
                Programa.guardarLocalStorage("listaJsonclientes");
                Programa.completarTablaLocalStorage("listaJsonclientes");
            }
        }
        
        static modificar(){
            Programa.clientes.splice(Programa.indexGlobal,1,Programa.tomarDatosForm());
            Programa.guardarLocalStorage("listaJsonclientes");
            Programa.completarTablaLocalStorage("listaJsonclientes");
            Programa.vaciarForm();
        }
        
//#endregion



//#region Filter, map, reduce
        static filtradoSexo(){
            var opcion:number = Number($("#selectFiltro").val());
            var listaFiltrada = new Array<humano.Cliente>();
            switch(opcion){
                case 1:
                    listaFiltrada = Programa.clientes.filter(function(cliente){
                        return cliente.sexo == 1; //--> returna un bool, lo q sea true lo guarda en la nueva lista,
                    });
                    break;

                case 2:
                    listaFiltrada = Programa.clientes.filter(function(cliente){
                        return cliente.sexo == 2; //--> returna un bool, lo q sea true lo guarda en la nueva lista,
                    });
                    break;

                default:
                    listaFiltrada = Programa.clientes;
                    break;
            }
            

            localStorage.setItem("listaFiltrada", JSON.stringify(listaFiltrada));
            Programa.completarTablaLocalStorage("listaFiltrada");
        }



        static promedioEdad(){
            var promedio:number = Programa.clientes.reduce(function(total, item){
                return total += item.edad;
            },0)/Programa.clientes.length;

            $("#nmbPromedio").val(promedio);
        }


        static ocultaColumna{

        }
/*
        static promedioPeso(){
            var promedio:number = Programa.clientes.reduce(function(total, item){
                return total += item.peso;
            },0)/Programa.clientes.length;

            alert("Promedio de peso: "+promedio);
        }
*/
        static muestraMayores(sexo:number){
            var ejemplo = Programa.clientes.filter(function(item){
                return item.sexo == sexo && item.edad>18;
            }).map(function(item){
                return {name: item.nombre};
            });
            console.log(ejemplo);
        }

//#endregion

    }
}

