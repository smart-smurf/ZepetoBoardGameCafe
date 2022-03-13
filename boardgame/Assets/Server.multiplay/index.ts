import { Sandbox, SandboxOptions, SandboxPlayer } from "ZEPETO.Multiplay"; 
import GameManager from "./Network/game/gameManager";
import ChangeState from "./Network/messages/changeState";
import ChangeTransform from "./Network/messages/changeTransform";
import JoinGame from "./Network/messages/gameTable/joinGame";
import LeaveGame from "./Network/messages/gameTable/leaveGame";
import { addPlayer, leavePlayer } from "./Network/service/player";
import Server from "./server";
 
export default class extends Sandbox {  
    private gameManager : GameManager;
    public get GameManager() : GameManager {return this.gameManager;}

    async onCreate(options: SandboxOptions) {  
        // 싱글턴
  
        Server.Instance = this;     
        
        console.log("[onCreate] Create GameManager")
        this.gameManager = new GameManager();
        this.gameManager.initialize();

        
        console.log("[onCreate] Message Receiver")
        // 위치 동기화
        new ChangeTransform().regist();
        // 캐릭터 애니메이션 동기화
        new ChangeState().regist(); 
        // 방 생성코드 동기화
        new JoinGame().regist();  
        // 방 생성코드 동기화
        new LeaveGame().regist();  
        console.log("[onCreate] Done");
    }

    onJoin(client: SandboxPlayer) {
        addPlayer(client); 
    }

    onLeave(client: SandboxPlayer, consented?: boolean) { 
        leavePlayer(client);
    }
 
 
}   