 
declare interface ReqCreateGame{
    table : number
    gameType : number
}

declare interface ReqJoinGame{
    table : Number
}

declare interface ReqLeaveGame{
    
}

declare interface ReqPlayGame{
    
}

declare interface NotifyCreateBoardGame{
    table : number,
    gameType : number,
    ownerId : number
}
 
declare interface NotifyGameResult{
    table : number,
    gameType : number, 
    winnerSessionIds : Array<string>,
    loserSessionIds :  Array<string> 
}

 