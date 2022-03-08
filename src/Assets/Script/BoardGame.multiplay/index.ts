import { Sandbox, SandboxOptions, SandboxPlayer } from "ZEPETO.Multiplay";
import { GameTable, Player, TransformShema } from "ZEPETO.Multiplay.Schema"; 
import CreateGame from "./Network/messages/creategame";  



export default class Server extends Sandbox { 
 
    private static _instance : Sandbox;
    public static get Instance() : Sandbox{
        return this._instance;
    }


    onCreate(options: SandboxOptions) {  
        Server._instance = this; 
        this.createBlackJackInstance(2); 
        let a = new CreateGame();

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