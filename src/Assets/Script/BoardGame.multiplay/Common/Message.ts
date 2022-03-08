import { Vector3Shema } from "ZEPETO.Multiplay.Schema"

 

export interface ReqChangeTransform{
    position : Vector3Shema,
    rotation : Vector3Shema
}
export interface ReqChangeState{
    state : number
}

export interface ReqCreateGame{
    tableId : number
}

export interface ReqJoinGame{
    tableId : Number
}

export interface ReqLeaveGame{
    
}

export interface ReqPlayGame{
    
}

export interface NotifyCreateGame{
    table : number, 
    onwerSessionId : string
}
 
export interface NotifyGameResult{
    table : number,
    gameType : number, 
    winnerSessionIds : Array<string>,
    loserSessionIds :  Array<string> 
}

 