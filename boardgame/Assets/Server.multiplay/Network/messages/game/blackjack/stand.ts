import Server from "../../../../server";
import Protocol from "../../../protocol"; 
export default class Stand extends Protocol {  
    public get MessageType(): string {
        return "ReqBlackJackStand"
    }

    public regist(): void { 
        Server.Instance.onMessage(this.MessageType, (client, message) => {   
        });
    }
 
}