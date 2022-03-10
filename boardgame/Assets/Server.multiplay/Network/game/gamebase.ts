import { SandboxPlayer } from "ZEPETO.Multiplay";
import { GameTable } from "ZEPETO.Multiplay.Schema";
import { GameTableState } from "../../Common/Enums";

export abstract class GameBase{
    protected gameTable : GameTable;
    constructor(gameTable : GameTable){
        this.gameTable = gameTable;
    }

    public ChangeState(state : GameTableState){
        this.gameTable.status = state;
    }

    public abstract OnPlayerLeave(client : SandboxPlayer) : void;
    public abstract OnPlayerJoin(client : SandboxPlayer) : void;
}