import { PlayerBase } from "./playerBase";
import { Player as PlayerState } from "ZEPETO.Multiplay.Schema"

export class Player extends PlayerBase{
    constructor(refPlayer : PlayerState){
        super();
        this.refPlayerState = refPlayer;
    }
    refPlayerState : PlayerState;
    
    batCoin : number;
    lose    : boolean;

    public clear(){
        this.batCoin = 0;
        this.lose    = false;
    }
}