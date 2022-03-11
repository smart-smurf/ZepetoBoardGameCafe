import { GameTable } from "ZEPETO.Multiplay.Schema";
import { GameTableState, GameType } from "../../Common/Enums";
import Server from "../../server"; 
import { Game } from "./blackjack/game";
import { GameBase } from "./gamebase";

export default class GameManager { 
    gameInstanceMap : Map<number, GameBase> = new Map<number, GameBase>();

    public initialize(){
        this.createGameInstance(GameType.BlackJack, 2);
    }

    private getInstanceIdOfGameType(gameType : GameType){ 
        let instanceID = (gameType + 1) * 1000;
        return instanceID;
    }
    private createGameInstance(gameType : GameType ,count: number) {  
        console.log(`[createGameInstance] ${gameType.toString()} +${count}`);
        for (let i = 0; i < count; i++) { 
            const table = new GameTable();
            table.maxPlayer = 4;
            table.gameType = gameType;
            table.status = GameTableState.READY; 
            table.tableId = this.getInstanceIdOfGameType(gameType) + i;  
            this.gameInstanceMap.set(table.tableId, new Game(table)); 
            Server.State.tables.set(table.tableId.toString(), table); 
        }
    }
}