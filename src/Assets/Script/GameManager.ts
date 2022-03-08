import { GameObject, WaitUntil, WaitWhile } from 'UnityEngine';
import { Room } from 'ZEPETO.Multiplay'
import { State } from 'ZEPETO.Multiplay.Schema';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script' 
import { ZepetoWorldMultiplay } from 'ZEPETO.World';
import MessageDispatcher from './MessageDispatcher';
import { GameState } from './Network/Common/Enums';


 
 

export default class GameManager extends ZepetoScriptBehaviour {


    private static _instance: GameManager = null;  
    public static get Instance(): GameManager {
        if (this._instance == null) {
            this._instance = GameObject.FindObjectOfType<GameManager>();
        }
        return this._instance;
    }
    

    public multiplay: ZepetoWorldMultiplay;
    private room: Room; 
    private gameState : GameState;
    private roomJoined : boolean;


    *GameInitialize() {
        this.gameState = GameState.LOADING;
        console.log("[Initialize]wait room create..");
        yield new WaitWhile(() => this.room === null); // 방 입장 대기
        console.log("[Initialize]room created, try join room..");
        yield new WaitWhile(() => !this.roomJoined );  // 방 입장후 입장 완료까지 대기
        console.log("[Initialize]done");
    }

    
    private OnStateChange(state: State, isFirst: boolean)
    { 
        if(isFirst){

        }
        else{

        }    
    }


    Start() { 
        this.multiplay.RoomCreated += (room: Room) => {
            this.room = room;
            MessageDispatcher.Instance.Init(this.room);
        };

        this.multiplay.RoomJoined += (room: Room) => {
            this.roomJoined = true;
            room.OnStateChange += this.OnStateChange; 
        };

        this.StartCoroutine(this.GameInitialize());
    }
}