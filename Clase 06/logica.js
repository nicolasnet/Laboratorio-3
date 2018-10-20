

/*

windows.onload  = =  $(document).ready(Function(){
    
                }
    
    
    $("#P") --> devuelve elemento con ID = "P"
    
    $(".P") --> devuelve elementos con Clase "P"
    
    
    


*/


$(document).ready(function(){
    $("#btn").click(function () {
        $.get("http://localhost:3000/personas", function(data, status){
            alert("Data: "+ data + "\nStatus: " + status);
            console.log(data);
        })        
    });

    $("#btnpost").click(function () {
        $.post("http://localhost:3000/nueva",{
            nombre: "Nicolas",
            apellido: "Gomez",
            sexo: "Male",
            fecha: "1991-11-25"
        },
        function(data, status){//no es obligatorio pasar estos parametros, solo son para utilizarlos luego.
            alert("Data: "+ data + "\nStatus: " + status);
            console.log(data);
        });        
    });


//Con el siguiente, se usa .ajax y es mucho mas completo, se pasa todo un JSON con todos los parametros
    $("#btnajax").click(function () {
        $.ajax(
            { url: "http://localhost:3000/nueva",
            data: {
            nombre: "Nicolas",
            apellido: "Gomez",
            sexo: "Male",
            fecha: "1991-11-25"
            },
            type: "POST",
            success: function(data, status){//no es obligatorio pasar estos parametros, solo son para utilizarlos luego.
                alert("Data: "+ data + "\nStatus: " + status);
                console.log(data);
            },
            error: function(status){
                alert("Error");
            },
            timeout:10,
            async: false
        });        
    });


    $("#avatar").change(function(){
        if(this.files && this.files[0]){ //si hay archivo en el array y en esta posicion 
            var fReader = new FileReader();

            fReader.addEventListener("load", function(e){
                console.log(e.target.result);
                $("#iAvatar").attr("src", e.target.result);//se le setea un atributo
            });
            
            //la siguiente funcion invoca al "load" al cual le seteamos una funcion anteriormente
            fReader.readAsDataURL(this.files[0]); //base64:  con esto pasamos la imagen, el array de byts, a un string
        }
    });
});