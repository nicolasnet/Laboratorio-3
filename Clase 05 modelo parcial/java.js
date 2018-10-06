var xml = new XMLHttpRequest();
var arrayJson = new Array();

window.onload = function(){
    xml.onreadystatechange = callbackGet;
    xml.open("GET", "http://localhost:3000/noticias",true);
    xml.send(null);
      
    var btn = document.getElementById("btnAgregar");
    btn.addEventListener("click", agregar);

    var btn = document.getElementById("btnCerrar");
    btn.addEventListener("click", ocultarDivAgregar);

    var btn = document.getElementById("btnGuardar");
    btn.addEventListener("click", guardar);


/*
    var btn = document.getElementById("btnEliminar");
    btn.addEventListener("click", eliminar);

    var btn = document.getElementById("btnEditar");
    btn.addEventListener("click", editar);
*/
}



function $(id){
    var obj = document.getElementById(id);
    return obj;
}



function callbackGet(){

    if(xml.readyState == 4){
        if(xml.status == 200 || xml.status == 210){ //por default el 200 significa sin errores
            //document.getElementById("texto").innerHTML = xml.responseText; //metemos al html lo q devuelve el servidor
            arrayJson = JSON.parse(xml.responseText);// con esta funcion pasamos de string a objeto JSON
            //JSON.stringify()  //con esta funcion pasamos de objeto JSON a string
            completaTexto();
        }else{
            alert("error "+xml.status);
        }
    }

}


function callbackPost(){
        var loading = $("loading");
        loading.hidden = false;
        if(xml.readyState == 4){
            if(xml.status == 200 || xml.status == 210){ //por default el 200 significa sin errores
                //document.getElementById("texto").innerHTML = xml.responseText; //metemos al html lo q devuelve el servidor
                arrayJson.push (JSON.parse(xml.responseText));// con esta funcion pasamos de string a objeto JSON
                //JSON.stringify()  //con esta funcion pasamos de objeto JSON a string
                loading.hidden = true;
                completaTexto();
            }else{
                alert("error "+xml.status);
            }
        }
    
    }



function completaTexto(){
    var divTexto = document.getElementById("texto");
    divTexto.innerHTML = "";
        for(var i=0; i<arrayJson.length; i++){
            divTexto.innerHTML += "<div class='noticia'>  <input type='button' value='X' id='btnEliminar' class='btnChico'> <input type='button' value='E' id='btnEditar' class='btnChico'> <h3>"+arrayJson[i].titulo+"</h3><p>"+arrayJson[i].noticia+"</p></div>"; 
        }
}



function agregar(){
    var divAgregar = document.getElementById("divAgregar");
    divAgregar.hidden=false;
}



function ocultarDivAgregar(){
    var obj = $("divAgregar");
    obj.hidden=true;
}



function guardar(){
    var email = "email@email.com";
    var titulo = document.getElementById("txtTitulo").value;
    var tema = document.getElementById("cboLista").value;
    var noticia = document.getElementById("txtDescripcion").value;
    
    var json = {"email":email, "tema": tema, "titulo": titulo, "noticia": noticia};

    xml.onreadystatechange = callbackPost;
    xml.open("POST", "http://localhost:3000/nuevaNoticia",true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
    ocultarDivAgregar();
    
    
}


function eliminar(){
    event.target.get
    // http://localhost:3000/eliminarNoticia
    // recibe un string de json como el guardar

}



function editar(){
    // http://localhost:3000/editarNoticia
    // recibe un string de json como el guardar
    btn.removeEventListener("click", "funcion a borrar") //con este borro las funciones q tiene el boton
    //
}


function av(e){
    e.target.getAttribute("name"); // esto devuelve el valor de ese atributo
    //la idea es q en name se guarde el id del json para dsp obtenerlo y usarlo para eliminar
}