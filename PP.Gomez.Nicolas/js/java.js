/*
import java.text.DateFormat;
import java.util.Date;
*/

var xml = new XMLHttpRequest();
var arrayJson = new Array();
var idJson;
var fechaActual = new Date();
//DateFormat Formato = new SimpleDateFormat("yyyy/mm/dd");



window.onload = function(){
    xml.onreadystatechange = callbackGet;
    xml.open("GET", "http://localhost:3000/personas",true);
    xml.send(null);

    var btn = $("btnCerrar");
    btn.addEventListener("click", cerrarDivAgregar);

    var btn = $("btnEliminar");
    btn.addEventListener("click", eliminar);

    var btn = $("btnModificar");
    btn.addEventListener("click", modificar);

}




//#region Fc Genericas
function $(id){
    var obj = document.getElementById(id);
    return obj;
}

function $Value(id){
    var valor = document.getElementById(id).value;
    return valor;
}

function mayusPrimera(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function mostarElemento(id){
    var obj = $(id);
    obj.hidden=false;
}

function ocultarElemento(id){
    var obj = $(id);
    obj.hidden=true;
}
//#endregion


//#region Callback
function callbackGet(){
    if(xml.readyState == 4){
        if(xml.status == 200 || xml.status == 210){
            //console.log(xml.responseText);
            arrayJson = JSON.parse(xml.responseText);            
            completaTexto();
        }else{
            alert("error "+xml.status);
        }
    }
}


function callbackEliminar(){
    ocultarElemento("divAgregar")
    mostarElemento("loading");
    if(xml.readyState == 4){
        if(xml.status == 200 || xml.status == 210){ //por default el 200 significa sin errores            
            ocultarElemento("loading");
            //console.log(xml.responseText)            
            //llamo nuevamente al GET para recargar el arrayJson con la data del servidor actualizada
            xml.onreadystatechange = callbackGet;
            xml.open("GET", "http://localhost:3000/personas",true);
            xml.send(null);           
        }else{
            alert("error "+xml.status);
        }
    }
}


function callbackModificar(){
    ocultarElemento("divAgregar")
    mostarElemento("loading");
    if(xml.readyState == 4){
        if(xml.status == 200 || xml.status == 210){ //por default el 200 significa sin errores            
            ocultarElemento("loading");
            //console.log(xml.responseText);
            var json = JSON.parse(xml.responseText);
            //console.log(json);
            for(var i=0; i<arrayJson.length; i++){
                if(arrayJson[i].id == json  .id){
                    arrayJson[i] = json;
                }
            }
            completaTexto();           
        }else{
            alert("error "+xml.status);
        }
    }
}
//#endregion


function completaTexto(){
    var tabla = document.getElementById("tbody");
    tabla.innerHTML = "";

    for(var i=0; i<arrayJson.length; i++){
        tabla.innerHTML += "<tr id='tr"+i.toString()+"' name="+arrayJson[i].id+"><td>"+arrayJson[i].nombre+"</td>"+"<td>"+arrayJson[i].apellido+"</td>"+"<td>"+arrayJson[i].fecha+"</td>"+"<td>"+arrayJson[i].sexo+"</td></tr>";
    }
    for(var i=0; i<arrayJson.length; i++){
        var fila = document.getElementById("tr"+i.toString());
        fila.addEventListener("dblclick", abrir);
    }
}


function vaciarDivAgregar(){
    $("txtNombre").value= "";
    $("txtApellido").value= "";
    $("fecha").value= "";
}


function cerrarDivAgregar(){
    ocultarElemento("divAgregar");
    vaciarDivAgregar();
}



function abrir(e){
    $("txtApellido").className = "inputDatos";
    $("txtNombre").className = "inputDatos";
    $("fecha").className = "inputDatos";
    $("fecha").max = fechaActual.toISOString(); //////////QUE ONDA ESTE MAX?

    mostarElemento("divAgregar");

    idJson = e.target.parentNode.getAttribute("name");
    llenarDatos(idJson);   
}



function eliminar(){        
    if(confirm("¿Seguro que desea eliminar esta persona?")){        
                    
        var json = {"id": parseInt(idJson)};

        xml.onreadystatechange = callbackEliminar;
        xml.open("POST", "http://localhost:3000/eliminar",true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json));
    }
        
}


function modificar(){
    var sexo;
    var nombre = $Value("txtNombre");
    var apellido = $Value("txtApellido");
    var fecha = $Value("fecha");

    if($("radioOptionF").checked){
        sexo = "Female";
    }else{
        sexo="Male";
    }

    var fechaJson = new Date(fecha);

    if(nombre.length >=4 && apellido.length>=4 && fechaJson.getTime() < fechaActual.getTime()){
        var json = {"id":idJson, "nombre":nombre, "apellido":apellido, "fecha": fecha, "sexo": sexo};
    
        xml.onreadystatechange = callbackModificar;
        xml.open("POST", "http://localhost:3000/editar",true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json));
        ocultarElemento("divAgregar");
    }else{
        if(nombre.length <4){
            alert("Nombre debe tener al menos 4 caracteres");
            $("txtNombre").className = "sindato";
        }

        if(apellido.length <4){
            alert("Apellido debe tener al menos 4 caracteres");
            $("txtApellido").className = "sindato";
        }      

        if(fechaJson.getTime() > fechaActual.getTime()){
            alert("Fecha debe ser menor a la fecha de hoy");
            $("fecha").className = "sindato";
        }
    }
}



function llenarDatos(id){
    for(var i=0; i<arrayJson.length; i++){
        if(arrayJson[i].id == id){
            $("txtNombre").value= arrayJson[i].nombre;
            $("txtApellido").value= arrayJson[i].apellido;
            $("fecha").value= arrayJson[i].fecha;
            var sexo = arrayJson[i].sexo;
            if(sexo == "Female"){
                console.log("es mujer");
                $("radioOptionF").checked = true;
            }else{
                console.log("es hombre");
                $("radioOptionM").checked = true;
            }
        }
    }
}