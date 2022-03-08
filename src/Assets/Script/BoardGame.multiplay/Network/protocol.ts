import { Sandbox } from "ZEPETO.Multiplay";

export default abstract class Protocol{  
    sandbox : Sandbox;
    public abstract get MessageType() : string;
    public OnMessage(sandbox : Sandbox){
        this.sandbox = sandbox;
    }
}