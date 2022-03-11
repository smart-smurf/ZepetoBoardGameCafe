import { Message } from "../../Common/Message";
import Server from "../../server";
import Protocol from "../protocol";
import { getPlayer } from "../service/player"; 
export default class ChangeState extends Protocol {  
    public get MessageType(): string {
        return "ReqChangeState"
    }

    public regist(): void { 
        Server.Instance.onMessage(this.MessageType, (client, message) => {  
             const msg = message as Message.Table.ReqChangeState; 
             const player = getPlayer(client);
             player.state = msg.state;
        });
    }
 
}