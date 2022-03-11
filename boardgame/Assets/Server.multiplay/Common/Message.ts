 
 
export namespace Message.Serialize{
    export interface Vector3{
        x : number,
        y : number,
        z : number
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
}

export namespace Message.BlackJack{
    interface CardInfo{
        shape : number,
        value : number
    }
    export interface NotifyStartGame{
        
    }
}