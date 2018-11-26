namespace mascota{

    export interface Animal{
        especie:string;
        nombre:string;
        edad:number;
        peso:number;
        hacerRuido():void;
    }

}