import { SandboxPlayer } from "ZEPETO.Multiplay"; 
import { getPlayer } from "../../service/player";
import { addPlayerToTable, removePlayerOnTable } from "../../service/table";
import { GameBase } from "../gamebase";

export class Game extends GameBase {
    public OnPlayerLeave(client: SandboxPlayer): void 
    {
        removePlayerOnTable(this.gameTable, getPlayer(client));
    }

    public OnPlayerJoin(client: SandboxPlayer): void 
    { 
        addPlayerToTable(this.gameTable, getPlayer(client));
    }  
}