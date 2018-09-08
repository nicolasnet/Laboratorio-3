
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
        alert("no sumo");
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

    var tabla = $("tbody");

    tabla.innerHTML+= "<tr><td>"+num1.value+"</td>"+"<td>"+num2.value+"</td>"+"<td>"+resultado.value+"</td></tr>"
    

}