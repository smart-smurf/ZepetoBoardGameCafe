import { ZepetoScriptBehaviour } from "ZEPETO.Script";
import GameManager from "../GameManager";
import MessageDispatcher from "../MessageDispatcher";
import { NotifyCreateGame, ReqChangeState, ReqChangeTransform, ReqCreateGame } from "./Common/Message"; 
import { WaitForSeconds } from "UnityEngine";
import { ZepetoCharacter, ZepetoPlayer } from "ZEPETO.Character.Controller";  




export default class NetworkPlayer extends ZepetoScriptBehaviour {

    zepetoCharacter: ZepetoCharacter;
    zepetoPlayer: ZepetoPlayer;
    transformSyncTick: number = 0.1;

    public Initialize(zepetoCharacter: ZepetoCharacter, zepetoPlayer: ZepetoPlayer) {
        this.zepetoCharacter = zepetoCharacter;
        this.zepetoPlayer = zepetoPlayer;
        this.StartCoroutine(this.DoSyncTransform()); 
    }

    Start() {
        MessageDispatcher.Instance.Regist<NotifyCreateGame>("NotifyCreateGame", this.NotifyCreateGame); 
    }
    // 이동 동기화
    public ReqChangeTransform(data: ReqChangeTransform) { 
        console.log(data);
        GameManager.Instance.Room.Send("ReqChangeTransform", data);
    }

    public ReqChangeState(data: ReqChangeState) {
        GameManager.Instance.Room.Send("ReqChangeState", data);
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
        while (true) {
            console.log('sync transform!');
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