 
 
export namespace Message.Serialize{
    export interface Vector3{
        x : number,
        y : number,
        z : number
    }
    export interface Player{
        sessionId : string
    }
}
export namespace Message.Table{

    export interface ReqChangeTransform{
        position : Serialize.Vector3,
        rotation : Serialize.Vector3
    }
    
    export interface ReqChangeState{
        state : number
    }
     
    export interface ReqJoinGame{
        tableId : Number
    }
    
    export interface ReqLeaveGame{
        
    }
    
    export interface ReqStartGame{
        
    }
     

    export interface NotifyJoinGame{
        senderSessionId : string
        tableId : number, 
        onwerSessionId : string,
        maxPlayer : number,
        currentPlayer : number,
        players : Array<Serialize.Player>
    }

    
    export interface NotifyLeaveGame{
        senderSessionId : string,
        onwerSessionId : string,
        tableId : number, 
        leavePlayer : string,
        maxPlayer : number,
        currentPlayer : number,
        players : Array<Serialize.Player>
    }
     
    export interface NotifyGameResult{
        table : number,
        gameType : number, 
        winnerSessionIds : Array<string>,
        loserSessionIds :  Array<string> 
    }
}
export namespace Message.BlackJack{
    interface CardInfo{
        shape    : number,
        value    : number,
        facedown : boolean
    }

    interface PlayerInfo{
        sessionId : string
        cards     : Array<CardInfo> 
        isDealer  : boolean
    }

    interface CurrentGameInfo{
        players : Array<PlayerInfo> 
    }
 
    export interface NotifyStartGame{
        gameInfo : CurrentGameInfo
    }
}