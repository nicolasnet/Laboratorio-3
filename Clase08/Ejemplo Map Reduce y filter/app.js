/*

Funciones:
Map(function) -> devuelve array de la misma cantidad de elementos

Filter(function)-> devuelve array igual o menor q el original

reduce(function, value)-> devuelve un valor

*/





//Map
let nums = [1,2,3,4,5,6];
let numSqrt =[];

for(let i=0;i<nums.length;i++){
    numSqrt[i] = nums[i]*nums[i];
}

console.log("Numero con foreach :",numSqrt);

console.log("Numero con map: ",nums.map(function (num){ //--> este num es cada item del array
    return num*num; //-> cada return equivale a la posiciones del original para hacer el nuevo array
}));
console.log("Numeros con arrowfunction : ",nums.map(num => num*num));





//Filter

let numFiltered =[];

let j=0;
for(let i=0;i<nums.length;i++){
    if(nums[i]>3){
        numFiltered[j]= nums[i];     
        j++;
    }
}

console.log("Numeros mayores a 3 : ",numFiltered);

console.log("Numeros mayores a 3 con filter :",nums.filter(function(num){
    return num>3; //--> returna un bool, lo q sea true lo guarda en la nueva lista,
}));

console.log("Numeros mayeres a 3 con arrowfuntion: ",nums.filter(num=>num>3));





//Reduce
let total =0;

for (let i=0;i<nums.length;i++){
    total +=nums[i];
}

console.log("Sumatoria de numeros: ",total);

var n  = nums.reduce(function(total,num){
    return total+=num;
},0); //-> aca definimos con q valor se inicia el valor q acumula (en este caso "total") y definimos de q tipo es el valor retornado por la funcion.

console.log("Sumatoria de numeros con reduce: ",n);


 