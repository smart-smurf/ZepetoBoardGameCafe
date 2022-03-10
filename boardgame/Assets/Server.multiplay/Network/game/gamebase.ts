import { GameTable } from "ZEPETO.Multiplay.Schema";

export abstract class GameBase{
    protected gameTable : GameTable;
    constructor(gameTable : GameTable){
        this.gameTable = gameTable;
    }
}