import { create } from "ts-node";
import { Sandbox, SandboxOptions, SandboxPlayer } from "ZEPETO.Multiplay";
import { GameTable, Player, TransformShema } from "ZEPETO.Multiplay.Schema";
import { NotifyCreateGame } from "./Common/Message";

export default class extends Sandbox {



    onCreate(options: SandboxOptions) {  
        this.createBlackJackInstance(2);
        this.onMessage("ReqCreateGame", (client , message)=>{
            
            let notifyMsg : NotifyCreateGame = { 
                onwerSessionId : client.sessionId,
                table : 0
            }

            console.log("ReqCreateGame, try Notify");
            this.broadcast("NotifyCreateGame", notifyMsg);
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
        player.currentGameTable = null; 

        this.state.players.set(player.sessionId, player); 
    }

    onLeave(client: SandboxPlayer, consented?: boolean) {
        console.log(`[OnLeavePlayer] ${client.sessionId} ${client.userId}`);
        this.state.players.delete(client.sessionId); 
    }



    createBlackJackInstance(count : number)
    {
        for(let i = 0; i< count ; i++){
 
            const table = new GameTable();
                  table.maxPlayer = 4; 
                  table.gameType  = 0;
                  table.status    = 0;
                  table.tableId   = 1000 + i;  
                
            this.state.tables.set(table.tableId.toString(), table);
            console.log(`table ${table} created`);
        }
    }
}   