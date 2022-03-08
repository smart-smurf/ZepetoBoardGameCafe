import { Sandbox, SandboxPlayer } from "ZEPETO.Multiplay";
import { GameTable, Player } from "ZEPETO.Multiplay.Schema";
import { NotifyCreateGame, ReqCreateGame } from "../../Common/Message";
import Protocol from "../protocol";
import { readFileSync } from 'fs';
export default class CreateGame<Req extends ReqCreateGame> extends Protocol {
    sandbox: Sandbox;

    
    public get MessageType(): string {
        return "ReqCreateGame"
    }

    public OnMessage(sandbox: Sandbox): void {
        super.OnMessage(sandbox);
        sandbox.onMessage(this.MessageType, (client, message) => {
            console.log('onMessage');
            const req = message as Req;
            const player = this.getPlayer(client);
            const table = this.sandbox.state.tables.get(req.tableId.toString());
            this.addPlayerToTable(table, player); 
        });
    }

    getPlayer(client: SandboxPlayer) {
        return this.sandbox.state.players.get(client.sessionId);
    }

    /**
     * 테이블 에서 플레이어 퇴장
     */
    removePlayerOnTable(player: Player) {
        if (player.currentTableId !== 0) {
            const table = this.sandbox.state.tables.get(player.currentTableId.toString());
            table.players = table.players.filter(x => x.sessionId !== player.sessionId);
        }
    }

    /**
 * 플레이어를 테이블에 추가
 */
    addPlayerToTable(gameTable: GameTable, player: Player) {
        // 게임 플레이 상태확인
        if (gameTable.status === 0) {
            // 방 정원초과 확인
            if (gameTable.players.length < gameTable.maxPlayer) {
                gameTable.owner = player;
                gameTable.players.push(player);
                player.currentTableId = gameTable.tableId;

                let notifyMsg: NotifyCreateGame = {
                    onwerSessionId: player.sessionId,
                    table: gameTable.tableId,
                }
                this.sandbox.broadcast("NotifyCreateGame", notifyMsg);
            }
        }
        else {
        }
    }
}