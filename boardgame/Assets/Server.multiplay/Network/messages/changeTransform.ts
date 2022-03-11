import { TransformSchema, Vector3Schema } from "ZEPETO.Multiplay.Schema"; 
import { Message } from "../../Common/Message";
import Server from "../../server";
import Protocol from "../protocol";
import { updatePlayerTransform } from "../service/player"; 
export default class ChangeTransform extends Protocol {  
    public get MessageType(): string {
        return "ReqChangeTransform"
    }

    public regist(): void { 
        console.log(`${this.MessageType} Registed!`); 
        Server.Instance.onMessage(this.MessageType, (client, message) => {   
             const msg = message as Message.Table.ReqChangeTransform;   
             const transform = new TransformSchema();   
             transform.position = new Vector3Schema();
             transform.position.x = msg.position.x;
             transform.position.y = msg.position.y;
             transform.position.z = msg.position.z; 
             transform.rotate = new Vector3Schema();
             transform.rotate.x = msg.rotation.x;
             transform.rotate.y = msg.rotation.y;
             transform.rotate.z = msg.rotation.z; 
             updatePlayerTransform(client, transform);
        });
    }
 
}