import { GameTable, Player } from "ZEPETO.Multiplay.Schema";
import Server from "../../server";
import { GameTableState, GameType } from "../../Common/Enums";


/**
 * 테이블 에서 플레이어 퇴장
 */
export function removePlayerOnTable(gameTable: GameTable, player: Player) {
    const table = Server.Instance.state.tables.get(player.currentTableId.toString());
    if(table !== gameTable){
        throw new Error("Valid Failed :: 플레이어의 방과, removePlayerOnTable 인자의 방이 서로 다름.")
    }

    for (let i = 0; i < table.players.length; i++) {
        if (table.players[i] === player) {
            table.players.deleteAt(i);
            player.currentTableId = 0;
            // 방장 변경
            if(table.players.length === 0){
                table.owner = null;
            }
            else{
                table.owner = table.players[0];
            }
            break;
        }
    }
}
 

/**
* 플레이어를 테이블에 추가
*/
export function addPlayerToTable(gameTable: GameTable, player: Player) {
    // 게임 플레이 상태확인
    if (gameTable.status === GameTableState.READY) { // 준비 상태인지 확인 
        if(gameTable.players.find(x => x === player)) throw new Error("이미 방에 입장한 플레이어 입니다.");
        if (gameTable.players.length < gameTable.maxPlayer) { // 정원초과 확인
            if (gameTable.owner === null) { 
                gameTable.owner = player;
            }
            gameTable.players.push(player);
            player.currentTableId = gameTable.tableId;
        }
        else {
            throw new Error("정원초과 테스트 exception");
        }
    }
    else {
        throw new Error("게임 중간에 참여할 수 없음.");
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