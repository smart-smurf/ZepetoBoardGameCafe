import { SandboxPlayer } from "ZEPETO.Multiplay";
import { GameTableState } from "../../../Common/Enums";
import { getPlayer } from "../../service/player";
import { GameBase } from "../gamebase";

export class Game extends GameBase {
    public OnPlayerLeave(client: SandboxPlayer): void 
    {
        if(this.gameTable.status == GameTableState.READY){
            const player = getPlayer(client);
            for(let i = 0; i< this.gameTable.players.length; i++){
                if(this.gameTable.players[i] === player){
                    this.gameTable.players.deleteAt(i);
                    break;
                }
            } 
        } 
    }

    public OnPlayerJoin(client: SandboxPlayer): void 
    { 
        if(this.gameTable.status == GameTableState.READY){
            const player = getPlayer(client);
            this.gameTable.players.push(player);
        } 
    }








}