import { GameTable, Player } from "ZEPETO.Multiplay.Schema";
import Server from "../../server";
import { GameTableState, GameType } from "../../Common/Enums"; 

 
/**
 * 테이블 에서 플레이어 퇴장
 */
export function removePlayerOnTable(player: Player) {
    if (player.currentTableId !== 0) {
        const table = Server.Instance.state.tables.get(player.currentTableId.toString());
        table.players = table.players.filter(x => x.sessionId !== player.sessionId);
    }
}

/**
* 플레이어를 테이블에 추가
*/
export function addPlayerToTable(gameTable: GameTable, player: Player) {
    // 게임 플레이 상태확인
    if (gameTable.status === 0) {
        // 방 정원초과 확인
        if (gameTable.players.length < gameTable.maxPlayer) {
            gameTable.owner = player;
            gameTable.players.push(player);
            player.currentTableId = gameTable.tableId; 
        }
        else{
            throw new Error("정원초과 테스트 exception");
        }
    }
    else {
    }
}


export function createGameInstance(count: number) { 
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