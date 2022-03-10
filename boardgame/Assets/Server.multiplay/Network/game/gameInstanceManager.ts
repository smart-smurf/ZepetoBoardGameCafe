import { GameTable } from "ZEPETO.Multiplay.Schema";
import { GameTableState, GameType } from "../../Common/Enums";
import Server from "../../server";

function createGameInstance(count: number) { 
    /* 블랙잭 테이블 인스턴스 생성 */
    for (let i = 0; i < count; i++) {
        const table = new GameTable();
        table.maxPlayer = 4;
        table.gameType = GameType.BlackJack;
        table.status = GameTableState.READY;
        table.tableId = 1000 + i;
        Server.Instance.state.tables.set(table.tableId.toString(), table);
    }

    /* 틱택토 테이블 인스턴스 생성 */
    for (let i = 0; i < count; i++) {
        const table = new GameTable();
        table.maxPlayer = 2;
        table.gameType = GameType.TicTacToe;
        table.status = GameTableState.READY;
        table.tableId = 2000 + i;
        Server.Instance.state.tables.set(table.tableId.toString(), table);
    }
}