import { TransformShema, Vector3Shema } from "ZEPETO.Multiplay.Schema";
import { ReqChangeTransform } from "../../Common/Message";
import Server from "../../server";
import Protocol from "../protocol";
import { getPlayer } from "../service/player"; 
export default class ChangeTransform extends Protocol {  
    public get MessageType(): string {
        return "ReqChangeTransform"
    }

    public Regist(): void { 
        Server.Instance.onMessage(this.MessageType, (client, message) => {  
             const msg = message as ReqChangeTransform; 
             const player = getPlayer(client);
             const transform = new TransformShema();

             transform.position = new Vector3Shema();
             transform.position.x = msg.position.x;
             transform.position.y = msg.position.y;
             transform.position.z = msg.position.z;

             transform.rotate = new Vector3Shema();
             transform.rotate.x = msg.rotation.x;
             transform.rotate.y = msg.rotation.y;
             transform.rotate.z = msg.rotation.z;
             
             player.transform = transform;
        });
    }
 
}