import Server from "../../../../server";
import Protocol from "../../../protocol"; 
export default class StartGame extends Protocol {  
    public get MessageType(): string {
        return "ReqBlackJackStartGame"
    }

    public regist(): void { 
        Server.Instance.onMessage(this.MessageType, (client, message) => {   
        });
    }
 
}