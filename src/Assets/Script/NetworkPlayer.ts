import { ZepetoScriptBehaviour } from "ZEPETO.Script";
import GameManager from "./GameManager";
import { ReqCreateGame } from "./Network/Common/Message";





export default class NetworkPlayer extends ZepetoScriptBehaviour { 
    
    
    ReqCreateGame(data : ReqCreateGame){
        GameManager.Instance.Room.Send("ReqCreateGame", data);
    }

    NotifyCreateGame(){
        
    } 
}