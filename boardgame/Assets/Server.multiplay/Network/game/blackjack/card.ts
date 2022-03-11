
export enum Shape {
    CLOVA = 0,
    DIAMOND = 1,
    HEART = 2,
    SPADE = 3
}
export class Card {
    constructor(shape: Shape, number: number) {
        this.shape = shape;
        this.number = number;
        this.facedown = false;
    }
    shape: Shape;
    number: number;
    facedown: boolean;

    public get FaceDown(): boolean {
        return this.facedown;
    }
    public set FaceDown(value : boolean) {
        this.facedown = value;
    }
 
}