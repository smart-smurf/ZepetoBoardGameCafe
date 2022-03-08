import { ZepetoScriptBehaviour } from "ZEPETO.Script";
import GameManager from "./GameManager";
import MessageDispatcher from "./MessageDispatcher";
import { NotifyCreateGame, ReqCreateGame } from "./Network/Common/Message";
import * as System from 'System';



 
export default class NetworkPlayer extends ZepetoScriptBehaviour {  
    Awake(){
        MessageDispatcher.Instance.Regist<NotifyCreateGame>("NotifyCreateGame", this.NotifyCreateGame); 
    } 
    public ReqCreateGame(data : ReqCreateGame){
        console.log("ReqCreateGame");
        GameManager.Instance.Room.Send("ReqCreateGame", data);
        
    }

    NotifyCreateGame(message : NotifyCreateGame){ 
        console.log("NotifyCreateGame");
        console.log(message.onwerSessionId);
        console.log(message.table); 
    } 
}