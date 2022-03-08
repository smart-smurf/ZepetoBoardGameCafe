import { SandboxPlayer } from "ZEPETO.Multiplay";
import { GameTable, Player } from "ZEPETO.Multiplay.Schema";
import Server from "../../server";
 

export function getPlayer(client: SandboxPlayer) {
    return Server.Instance.state.players.get(client.sessionId);
}

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