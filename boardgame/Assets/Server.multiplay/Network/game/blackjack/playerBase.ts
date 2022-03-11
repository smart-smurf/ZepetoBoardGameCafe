import { Card } from "./card";

export class PlayerBase {
    constructor(){

    }
    protected cards = Array<Card>(); 

    public addCard(card : Card){
        this.cards.push(card);
    }

    public clearCardList(){
        this.cards = [];
    }

    public getCardList(){
        return this.cards;
    } 
}