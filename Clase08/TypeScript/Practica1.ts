/*
todo codigo de JS funciona en TS
TS lo q hace es agregar clases y tipos estaticos y despues lo pasa a fomato JS


tipos de datos en Type scrip

Object -> any ---> cuando no sepamos q poner
boolean -> boolean
int, long, double -> number


*/

/*
hacer esto en casa para tenerlo de manera global
npm install - g tsg

tsc Practica1.ts ----> para transpilar a JS
tsc *.ts -----> para tranpilar a JS todos los archivos de la ubicacion
*/


// Tipos
var batman:string = "Bruce";
var superman:string = "Clark";

var existe:boolean = false;

// Tuplas
var parejaHeroes:string[] = [batman,superman];
var villano:[string, number, boolean] = ["Lex Lutor",5,true];

// Arreglos
var aliados:string[] = ["Mujer Maravilla","Acuaman","San", "Flash"];

//Enumeraciones
var fuerzaFlash:number = 5;
var fuerzaSuperman:number = 100;
var fuerzaBatman:number = 1;
var fuerzaAcuaman:number = 0;

// Retorno de funciones
function activar_batiseñal():string{
  return "activada";
}

function pedir_ayuda():void{
  console.log("Auxilio!!!");
}

// Aserciones de Tipo
var poder:string = "100";
var largoDelPoder = poder.length;
console.log( largoDelPoder );
