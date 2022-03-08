import { Sandbox, SandboxOptions, SandboxPlayer } from "ZEPETO.Multiplay";
import { GameTable } from "ZEPETO.Multiplay.Schema";  
import ChangeState from "./Network/messages/changeState";
import ChangeTransform from "./Network/messages/changeTransform";
import CreateGame from "./Network/messages/createGame";
import { addPlayer, leavePlayer } from "./Network/service/player";
import Server from "./server";


export default class extends Sandbox { 
  

    onCreate(options: SandboxOptions) {  
        // 싱글턴
        Server.Instance = this;  
        
        // 위치 동기화
        new ChangeTransform().Regist();
        // 캐릭터 애니메이션 동기화
        new ChangeState().Regist(); 
        // 방 생성코드 동기화
        new CreateGame().Regist(); 

        // 코드 테스트
        this.createBlackJackInstance(2);    
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