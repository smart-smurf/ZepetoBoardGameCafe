import { ZepetoScriptBehaviour } from "ZEPETO.Script";
import GameManager from "../GameManager";
import MessageDispatcher from "../MessageDispatcher";
import { WaitForSeconds } from "UnityEngine";
import { ZepetoCharacter, ZepetoPlayer } from "ZEPETO.Character.Controller";
import { RoomData } from "ZEPETO.Multiplay";
import NetworkHelper from './NetworkHelper';
import { Message } from "./Common/Message";
import * as System from 'System';
export default class NetworkPlayer extends ZepetoScriptBehaviour {

    zepetoCharacter: ZepetoCharacter;
    zepetoPlayer: ZepetoPlayer;
    transformSyncTick: number = 0.1;
 

    public Initialize(zepetoCharacter: ZepetoCharacter, zepetoPlayer: ZepetoPlayer) {
        this.zepetoCharacter = zepetoCharacter;
        this.zepetoPlayer = zepetoPlayer;
        this.StartCoroutine(this.DoSyncTransform());
        this.zepetoCharacter.OnChangedState.AddListener((prev, cur) => {
            this.ReqChangeState({
                state: this.zepetoCharacter.CurrentState
            });
        });
    }

    Start() { 
        MessageDispatcher.Instance.Regist<Message.Table.NotifyJoinGame>("NotifyJoinGame", this.OnNotifyJoinGame);

    }


    // 이동 동기화
    public ReqChangeTransform(data: Message.Table.ReqChangeTransform) {
        const packet = new RoomData();
        packet.Add("position", NetworkHelper.SingleObjectToRoomData(data.position).GetObject());
        packet.Add("rotation", NetworkHelper.SingleObjectToRoomData(data.rotation).GetObject());
        GameManager.Instance.Room.Send("ReqChangeTransform", packet.GetObject());
    }

    public ReqChangeState(data: Message.Table.ReqChangeState) {
        const packet = new RoomData();
        packet.Add("state", data.state);
        GameManager.Instance.Room.Send("ReqChangeState", packet.GetObject());
    }

    // 테이블 생성
    public ReqJoinGame(data: Message.Table.ReqJoinGame) {
        GameManager.Instance.Room.Send("ReqJoinGame", data);
    }

    OnNotifyJoinGame(message: Message.Table.NotifyJoinGame) {
        console.log(` ID ${message.tableId} Players ${message.currentPlayer}/${message.maxPlayer}  Length ${message.players.length}  OwnerSessionId ${message.onwerSessionId}`);
    }


    public * DoSyncTransform() {
        yield new WaitForSeconds(1);
        while (true) {
            yield new WaitForSeconds(this.transformSyncTick);
            this.ReqChangeTransform({
                position: {
                    x: this.zepetoCharacter.transform.position.x,
                    y: this.zepetoCharacter.transform.position.y,
                    z: this.zepetoCharacter.transform.position.z
                },
                rotation: {
                    x: this.zepetoCharacter.transform.rotation.eulerAngles.x,
                    y: this.zepetoCharacter.transform.rotation.eulerAngles.y,
                    z: this.zepetoCharacter.transform.rotation.eulerAngles.z
                }
            })
        }
    }


}