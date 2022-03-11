import { GameObject, UnityException } from 'UnityEngine';
import { UnityAction } from 'UnityEngine.Events'
import { Room } from 'ZEPETO.Multiplay'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import * as System from 'System';
 

/**
 * 메세지 
 */
export default class MessageDispatcher extends ZepetoScriptBehaviour {
   
    private static _instance: MessageDispatcher = null;  
    public static get Instance(): MessageDispatcher {
        if (this._instance == null) {
            this._instance = GameObject.FindObjectOfType<MessageDispatcher>();
        }
        return this._instance;
    } 
   
    private room : Room; 

    public Init(room : Room){
        
        this.room = room;
    }

    public Regist<T>(message : string, action : System.Action$1<T>){
        if(this.room === null){
            throw new UnityException("[메시지 핸들 등록 실패] Message Dispatcher가 Initialize 되지 않음!");
        }
        this.room.AddMessageHandler(message, action);
    }
}