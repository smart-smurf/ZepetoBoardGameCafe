import { Sandbox, SandboxOptions, SandboxPlayer } from "ZEPETO.Multiplay";
import { GameTable, Player, TransformShema } from "ZEPETO.Multiplay.Schema";  
import CreateGame from "./Network/messages/creategame";
import { addPlayer, leavePlayer } from "./Network/service/player";
import Server from "./server";


export default class extends Sandbox { 
  

    onCreate(options: SandboxOptions) {  
        Server.Instance = this; 
        this.createBlackJackInstance(2);   
        new CreateGame().Regist();
    }

    onJoin(client: SandboxPlayer) {
        addPlayer(client); 
    }

    onLeave(client: SandboxPlayer, consented?: boolean) { 
        leavePlayer(client);
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