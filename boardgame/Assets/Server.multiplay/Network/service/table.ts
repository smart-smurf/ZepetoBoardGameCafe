import { GameTable, Player } from "ZEPETO.Multiplay.Schema";
import Server from "../../server";
import { GameTableState, GameType } from "../../Common/Enums";


/**
 * 테이블 에서 플레이어 퇴장
 */
export function removePlayerOnTable(player: Player) {
    const table = Server.Instance.state.tables.get(player.currentTableId.toString());  
    if(table === null) throw new Error("현재 입장중인 방이 없음.");

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

export function findGameTableById(tableId : number) : GameTable{
    return Server.Instance.state.tables.get(tableId.toString());
}