import Server from "../../../../server";
import Protocol from "../../../protocol"; 
export default class Bet extends Protocol {  
    public get MessageType(): string {
        return "ReqBlackBet"
    }

    public regist(): void { 
        Server.Instance.onMessage(this.MessageType, (client, message) => {   
        });
    }
 
}