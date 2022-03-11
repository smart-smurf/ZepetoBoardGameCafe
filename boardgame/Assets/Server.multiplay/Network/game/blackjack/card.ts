
export enum Shape{
    CLOVA = 0,
    DIAMOND = 1,
    HEART = 2,
    SPADE = 3
}
export class Card {
    constructor(shape : Shape, number : number){
        this.shape = shape;
        this.number = number;
    }
    shape : Shape;
    number : number; 
} 