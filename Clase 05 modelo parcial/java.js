var xml = new XMLHttpRequest();
var arrayJson = new Array();

window.onload = function(){
    xml.onreadystatechange = callbackGet;
    xml.open("GET", "http://localhost:3000/noticias",true);
    xml.send(null);
      
    var btn = document.getElementById("btnAgregar");
    btn.addEventListener("click", agregar);

    var btn = document.getElementById("btnCerrar");
    btn.addEventListener("click", cerrarDivAgregar);

    var btn = document.getElementById("btnGuardar");
    btn.addEventListener("click", guardar);    
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
        if(xml.status == 200 || xml.status == 210){ //por default el 200 significa sin errores
            //document.getElementById("texto").innerHTML = xml.responseText; //metemos al html lo q devuelve el servidor
            arrayJson = JSON.parse(xml.responseText);//JSON.parse: con esta funcion pasamos de string a objeto JSON            
            //JSON.stringify()  //con esta funcion pasamos de objeto JSON a string
            completaTexto();
        }else{
            alert("error "+xml.status);
        }
    }
}


function callbackPost(){
    mostarElemento("loading");
    if(xml.readyState == 4){
        if(xml.status == 200 || xml.status == 210){ //por default el 200 significa sin errores
            //document.getElementById("texto").innerHTML = xml.responseText; //metemos al html lo q devuelve el servidor
            arrayJson.push (JSON.parse(xml.responseText));//JSON.parse: con esta funcion pasamos de string a objeto JSON
            console.log(xml.responseText);
            //JSON.stringify()  //con esta funcion pasamos de objeto JSON a string
            ocultarElemento("loading");
            completaTexto();
            vaciarDivAgregar();                
        }else{
            alert("error "+xml.status);
        }
    }    
}


function callbackEdicion(){
    mostarElemento("loading");
    if(xml.readyState == 4){
        if(xml.status == 200 || xml.status == 210){ //por default el 200 significa sin errores            
            ocultarElemento("loading");
            console.log(xml.responseText)
            //llamo nuevamente al GET para recargar el arrayJson con la data del servidor actualizada
            xml.onreadystatechange = callbackGet;
            xml.open("GET", "http://localhost:3000/noticias",true);
            xml.send(null);
            vaciarDivAgregar();            
        }else{
            alert("error "+xml.status);
        }
    }

}
//#endregion




function completaTexto(){
    var divTexto = document.getElementById("texto");
    divTexto.innerHTML = "";

    for(var i=0; i<arrayJson.length; i++){
        divTexto.innerHTML += "<div class='noticia'>  <input type='button' value='X' id='btnEliminar"+i.toString()+"' class='btnChico borrar' name="+arrayJson[i].id+"> <input type='button' value='E' id='btnEditar"+i.toString()+"' class='btnChico editar' name="+arrayJson[i].id+"> <h3>"+arrayJson[i].titulo+"</h3><div class='fecha'>"+arrayJson[i].fecha+"</div><p>"+arrayJson[i].noticia+"</p></div>"; 
    }
    for(var i=0; i<arrayJson.length; i++){
        var btn = document.getElementById("btnEliminar"+i.toString());
        btn.addEventListener("click", function(){ eliminar(event)});
        var btn = document.getElementById("btnEditar"+i.toString());
        btn.addEventListener("click", function(){ editar(event)});
    }
}



function agregar(){
    $("txtTitulo").className = "txtTitulo";
    $("txtDescripcion").className = "txtDescripcion";
    
    mostarElemento("divAgregar");
    var bienvenido = document.getElementById("h4Bienvenido");
    bienvenido.innerHTML = "<br><br> ";
}


function vaciarDivAgregar(){
    document.getElementById("txtTitulo").value = "";
    document.getElementById("txtDescripcion").value= "";
    document.getElementById("cboLista").value= "Deporte";
}


function cerrarDivAgregar(){
    ocultarElemento("divAgregar");
    vaciarDivAgregar();
    var btn = document.getElementById("btnGuardar");
    btn.addEventListener("click", guardar);
}


function guardar(){
    var email = "email@email.com";
    var titulo = mayusPrimera(document.getElementById("txtTitulo").value);
    var tema = document.getElementById("cboLista").value;
    var noticia = document.getElementById("txtDescripcion").value;
    
    if(titulo != "" & noticia != ""){

        var json = {"email":email, "tema": tema, "titulo": titulo, "noticia": noticia};

        xml.onreadystatechange = callbackPost;
        xml.open("POST", "http://localhost:3000/nuevaNoticia",true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json));
        ocultarElemento("divAgregar");
    }else{
        if(titulo == ""){
            $("txtTitulo").className += " sindato";
        }
        if(noticia == ""){
            $("txtDescripcion").className += " sindato";
        }
    }
}


function eliminar(e){
    if(confirm("¿Seguro que desea eliminar esta noticia?")){
        //la idea es que en name se guarde el id del json para dsp obtenerlo y usarlo para eliminar
        var id = e.target.getAttribute("name"); // esto devuelve el valor de ese atributo
        console.log(id);
        var json = {"id": parseInt(id)};

        xml.onreadystatechange = callbackEdicion;
        xml.open("POST", "http://localhost:3000/eliminarNoticia",true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json)); // recibe un string de json como el guardar
    }    
}



function editar(e){
    id = e.target.getAttribute("name");
    for (let i = 0; i < arrayJson.length; i++) {
        if(arrayJson[i].id == id){
            var json = arrayJson[i];
        }
    }
    document.getElementById("txtTitulo").value = json.titulo;
    document.getElementById("cboLista").value = json.tema;
    document.getElementById("txtDescripcion").value = json.noticia;
    agregar();
    cambioFuncionGuardar(id);
}


function guardaEdicion(id){
    var email = "email@email.com";
    var titulo = mayusPrimera(document.getElementById("txtTitulo").value);
    var tema = document.getElementById("cboLista").value;
    var noticia = document.getElementById("txtDescripcion").value;
    
    var json = {"id":id, "email":email, "tema": tema, "titulo": titulo, "noticia": noticia};

    xml.onreadystatechange = callbackEdicion;
    xml.open("POST", "http://localhost:3000/editarNoticia",true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
    ocultarElemento("divAgregar");

    var btn = document.getElementById("btnGuardar");
    btn.addEventListener("click", guardar);
}


function cambioFuncionGuardar(id){
    var btn = document.getElementById("btnGuardar");
    btn.removeEventListener("click", guardar); //con este borro la funcion especifica q tiene el boton
    btn.addEventListener("click", function(){ guardaEdicion(id)});
}



