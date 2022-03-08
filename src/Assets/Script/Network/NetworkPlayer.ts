import { ZepetoScriptBehaviour } from "ZEPETO.Script";
import GameManager from "../GameManager";
import MessageDispatcher from "../MessageDispatcher";
import { NotifyCreateGame, ReqChangeState, ReqChangeTransform, ReqCreateGame } from "./Common/Message"; 
import { Vector3, WaitForSeconds } from "UnityEngine";
import { ZepetoCharacter, ZepetoPlayer } from "ZEPETO.Character.Controller";
import { Vector3Schema } from "ZEPETO.Multiplay.Schema";




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


    SchemaToVector3(vector: Vector3Schema): Vector3 {
        return new Vector3(vector.x, vector.y, vector.z);
    }
    Vector3ToSchema(vector: Vector3): Vector3Schema {
        const schema = new Vector3Schema();
        schema.x = vector.x;
        schema.y = vector.y;
        schema.z = vector.z;
        return schema;
    }


    public * DoSyncTransform() {
        while (true) {
            console.log('sync transform!');
            yield new WaitForSeconds(this.transformSyncTick);
            GameManager.Instance.NetworkPlayer.ReqChangeTransform({
                position: this.Vector3ToSchema(this.zepetoCharacter.transform.position),
                rotation: this.Vector3ToSchema(this.zepetoCharacter.transform.rotation.eulerAngles)
            })
        }
    }


}