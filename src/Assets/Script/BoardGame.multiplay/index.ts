import { create } from "ts-node";
import { Sandbox, SandboxOptions, SandboxPlayer } from "ZEPETO.Multiplay";
import { GameTable, Player, TransformShema } from "ZEPETO.Multiplay.Schema";
import { NotifyCreateGame, ReqCreateGame } from "./Common/Message";

export default class extends Sandbox {


    getPlayer(client: SandboxPlayer) {
        return this.state.players.get(client.sessionId);
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
                this.broadcast("NotifyCreateGame", notifyMsg);
            }
        }
        else {
        }
    } 


    /**
     * 테이블 에서 플레이어 퇴장
     */
    removePlayerOnTable(player: Player){
        if(player.currentTableId !== 0){
            const table = this.state.tables.get(player.currentTableId.toString());
            table.players = table.players.filter(x => x.sessionId !== player.sessionId);  
        }
    }

    onCreate(options: SandboxOptions) {
        console.log('server instance create');
        this.createBlackJackInstance(2);
        this.onMessage("ReqCreateGame", (client, message) => {
            const req = message as ReqCreateGame;
            const player = this.getPlayer(client);
            const table = this.state.tables.get(req.tableId.toString());
            this.addPlayerToTable(table, player);
        });
    }

    onJoin(client: SandboxPlayer) {
        console.log(`[OnJoinPlayer] ${client.sessionId} ${client.userId}`);
        const player = new Player();
        player.sessionId = client.sessionId;
        player.hash = client.hashCode;
        player.userId = client.userId;

        const transform = new TransformShema();
        player.transform = transform;
        player.currentTableId = 0;

        this.state.players.set(player.sessionId, player);
    }

    onLeave(client: SandboxPlayer, consented?: boolean) {
        console.log(`[OnLeavePlayer] ${client.sessionId} ${client.userId}`);
        this.state.players.delete(client.sessionId);
    }



    createBlackJackInstance(count: number) {
        for (let i = 0; i < count; i++) {

            const table = new GameTable();
            table.maxPlayer = 4;
            table.gameType = 0;
            table.status = 0;
            table.tableId = 1000 + i; 
            this.state.tables.set(table.tableId.toString(), table);
            console.log(`table ${table} created`);
        }
    }
}   