import { Card, Shape } from "./card";

export class PlayerBase {
    constructor(){
        
    }
    protected cards = Array<Card>(); 

    public AddCard(card : Card){
        this.cards.push(card);
    }

    public ClearCards(){
        this.cards = [];
    }

    public GetCards(){
        return this.cards;
    } 
}