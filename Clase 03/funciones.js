var listaCuentas;

//Con este metodo, cuando se termina de carga la pagina, le pasas un onclick a un boton, ES LO MAS PROLIJO
// (en lugar de poner el onclick en el html)
window.onload= function(){
     var btn = $("btnVisible");
     btn.addEventListener("click", Visible);

     var btn = $("btnNoVisible");
     btn.addEventListener("click", NoVisible);

     var btn = $("btnSumar");
     btn.addEventListener("click", sumar);

     var btn = $("btnSumarGuardar");
     btn.addEventListener("click", sumarGuardar);

     var btn = $("btnBorraHistorial");
     btn.addEventListener("click", borraHistorial);


     var cuenta1 = {"num1": "5", "num2": "7", "resultado": "13"};
     listaCuentas = [cuenta1, {"num1": "10", "num2": "7", "resultado": "17"}]
     listaCuentas.push({"num1": "1", "num2": "3", "resultado": "4"}); //agrega un json
     //listaCuentas.splice(0,1); //borra desde el 0 hasta 1 posicion, osea con esto borra el 1er objeto del array
     
    muestraEnTabla();

}
//tambien podria pasarse window.onload = nombreFuncion //se para por referencia sin parentesis




function sumar(){
    var res = confirm("Seguro que desea sumar?");

    if(res){
        var num1 = $("num1");
        var num2 = document.getElementById("num2");
        var resultado = document.getElementById("resultado");

        if(num1.value == ""){
            num1.className = "sindato";
            alert("Ingresar el 1er numero");
            return;                        
        }

        if(num2.value == ""){
            num2.className = "sindato";
            alert("Ingresar el 2do numero");                   
            return;
        }

        resultado.value = parseFloat(num1.value) + parseFloat(num2.value);
        var pDescripcion = $("pDescripcion");
        pDescripcion.innerHTML = "Ya puede ver el resultado.";
    }else{
        alert("no sumó");
    }


}


function $(id){
    var obj = document.getElementById(id);
    return obj;
}


function sumarGuardar(){
    var num1 = $("num1");
    var num2 = document.getElementById("num2");
    var resultado = document.getElementById("resultado");
    resultado.value = parseFloat(num1.value) + parseFloat(num2.value);
    var pDescripcion = $("pDescripcion"); //este tag es el parrafo de inicio
    pDescripcion.innerHTML = "Ya puede ver el resultado."; //se accede al texto entre el tag d inicio y final de este tag
   
    listaCuentas.push = {"num1": num1.value, "num2": num2.value, "resultado": resultado.value};

    var tabla = $("tbody");
    /*
    var copianum1 = num1.value;
    var copianum2 = num2.value;
    var copiaresult = resultado.value;

    var i = 0;
    
    alert(i);
    var matriz = new Array();
    matriz[i].push = (copianum1, copianum2, copiaresult);
    alert(matriz[i][0]);
    */

    muestraEnTabla();
    
    NoVisible();
}



function muestraEnTabla(){
    for (var i = 0; i < listaCuentas.length; i++) {
        var cuenta = listaCuentas[i];
        tabla.innerHTML+= "<tr><td>"+cuenta.num1+"</td>"+"<td>"+cuenta.num2+"</td>"+"<td>"+cuenta.resultado+"</td>"+"<td><input type='button' value='Mostrar' onclick='mostrar(num1.value, num2.value, resultado.value)' class='button'></td><td><a href='' onclick='tagA(event)' >Borrar</a></td></tr>";    
        
    }
}




function tagA(event){
    event.preventDefault();
    if(confirm("Seguro que desea eliminar?")){
        alert("Ole, no se borro :P");
    }

}



function mostrar(valor1, valor2, valorresultado){
    var num1 = $("num1");
    var num2 = $("num2");
    var resultado = $("resultado");

    num1.value = valor1;
    num2.value = valor2;
    resultado.value = valorresultado;
}






function borraHistorial(){
    var tabla = $("tbody");
    tabla.innerHTML = "";    
}


function Visible(){
    var fieldset = $("inputs");
    fieldset.className = "fieldsetVisible";
}

function NoVisible(){
    var fieldset = $("inputs");
    fieldset.className = "fieldsetNOVisible";
}