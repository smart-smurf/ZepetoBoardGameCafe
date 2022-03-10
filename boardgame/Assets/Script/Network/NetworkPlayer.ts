import { ZepetoScriptBehaviour } from "ZEPETO.Script";
import GameManager from "../GameManager";
import MessageDispatcher from "../MessageDispatcher";
import { NotifyCreateGame, ReqChangeState, ReqChangeTransform, ReqCreateGame } from "./Common/Message"; 
import { WaitForSeconds } from "UnityEngine";
import { ZepetoCharacter, ZepetoPlayer } from "ZEPETO.Character.Controller";  
import { RoomData } from "ZEPETO.Multiplay"; 




export default class NetworkPlayer extends ZepetoScriptBehaviour {

    zepetoCharacter: ZepetoCharacter;
    zepetoPlayer: ZepetoPlayer;
    transformSyncTick: number = 0.1;

    public Initialize(zepetoCharacter: ZepetoCharacter, zepetoPlayer: ZepetoPlayer) {
        this.zepetoCharacter = zepetoCharacter;
        this.zepetoPlayer = zepetoPlayer;
        this.StartCoroutine(this.DoSyncTransform()); 
        this.zepetoCharacter.OnChangedState.AddListener( (prev, cur)=>{
            this.ReqChangeState({
               state : this.zepetoCharacter.CurrentState 
            });
        });
    }

    Start() {
        MessageDispatcher.Instance.Regist<NotifyCreateGame>("NotifyCreateGame", this.NotifyCreateGame); 
    }

    
    // 이동 동기화
    public ReqChangeTransform(data: ReqChangeTransform) {
        const packet = new RoomData();
        const position = new RoomData();
        const rotation = new RoomData();
        position.Add("x", data.position.x);
        position.Add("y", data.position.y);
        position.Add("z", data.position.z);
        rotation.Add("x", data.rotation.x);
        rotation.Add("y", data.rotation.y);
        rotation.Add("z", data.rotation.z);
        packet.Add("position", position);
        packet.Add("rotation", rotation);   
        GameManager.Instance.Room.Send("ReqChangeTransform", packet.GetObject());   
    }
 
    public ReqChangeState(data: ReqChangeState) { 
        const packet = new RoomData();
        packet.Add("state", data.state);
        GameManager.Instance.Room.Send("ReqChangeState", packet.GetObject());
    }

    // 테이블 생성
    public ReqCreateGame(data: ReqCreateGame) {
        GameManager.Instance.Room.Send("ReqCreateGame", data);
    }

    NotifyCreateGame(message: NotifyCreateGame) {
        console.log("NotifyCreateGame");
        console.log(message.onwerSessionId);
        console.log(message.table);
    }
 

    public * DoSyncTransform() {
        yield new WaitForSeconds(1);
        while (true) { 
            yield new WaitForSeconds(this.transformSyncTick);
            this.ReqChangeTransform({ 
                position : {
                    x : this.zepetoCharacter.transform.position.x,
                    y : this.zepetoCharacter.transform.position.y,
                    z : this.zepetoCharacter.transform.position.z
                },
                rotation: {
                    x : this.zepetoCharacter.transform.rotation.eulerAngles.x,
                    y : this.zepetoCharacter.transform.rotation.eulerAngles.y,
                    z : this.zepetoCharacter.transform.rotation.eulerAngles.z
                }
            })
        }
    }


}