import { SandboxPlayer } from "ZEPETO.Multiplay";
import { GameTable } from "ZEPETO.Multiplay.Schema";
import { GameTableState } from "../../Common/Enums";

export abstract class GameBase{
    protected gameTable : GameTable;
    constructor(gameTable : GameTable){
        this.gameTable = gameTable;
    }

    public changeState(state : GameTableState){
        this.gameTable.status = state;
    }


    /**
     * 아래 콜백들은 플레이어 퇴장/입장에 대한 콜백인데 당연히 GameTable의 players 을 참조하는 콜백이다.
     */
    public abstract onPlayerLeave(client : SandboxPlayer) : void;
    public abstract onPlayerJoin(client : SandboxPlayer) : void;
}