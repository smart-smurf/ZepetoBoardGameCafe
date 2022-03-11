import Server from "../../../../server";
import Protocol from "../../../protocol"; 
export default class Hit extends Protocol {  
    public get MessageType(): string {
        return "ReqBlackJackHit"
    }

    public regist(): void { 
        Server.Instance.onMessage(this.MessageType, (client, message) => {   
        });
    }
 
}