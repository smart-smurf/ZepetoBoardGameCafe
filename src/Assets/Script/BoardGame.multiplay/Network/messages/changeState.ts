import { ReqChangeState } from "../../Common/Message";
import Server from "../../server";
import Protocol from "../protocol";
import { getPlayer } from "../service/player"; 
export default class ChangeState extends Protocol {  
    public get MessageType(): string {
        return "ReqChangeState"
    }

    public Regist(): void { 
        Server.Instance.onMessage(this.MessageType, (client, message) => {  
             const msg = message as ReqChangeState; 
             const player = getPlayer(client);
             player.state = msg.state;
        });
    }
 
}