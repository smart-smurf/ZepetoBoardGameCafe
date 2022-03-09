interface Vector3{
    x : number,
    y : number,
    z : number
}

export interface ReqChangeTransform{
    position : Vector3,
    rotation : Vector3
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

 