export default abstract class Protocol{   
    constructor(){
        
    }
    public abstract get MessageType() : string;
    public abstract Regist() : void;
}