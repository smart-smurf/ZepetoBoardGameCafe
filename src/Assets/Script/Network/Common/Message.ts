 
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

export interface NotifyCreateBoardGame{
    table : number,
    gameType : number,
    ownerId : number
}
 
export interface NotifyGameResult{
    table : number,
    gameType : number, 
    winnerSessionIds : Array<string>,
    loserSessionIds :  Array<string> 
}

 