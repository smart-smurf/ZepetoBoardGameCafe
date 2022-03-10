import { TransformSchema, Vector3Schema } from "ZEPETO.Multiplay.Schema";
import { ReqChangeTransform } from "../../Common/Message";
import Server from "../../server";
import Protocol from "../protocol";
import { updatePlayerTransform } from "../service/player"; 
export default class ChangeTransform extends Protocol {  
    public get MessageType(): string {
        return "ReqChangeTransform"
    }

    public Regist(): void { 
        console.log(`${this.MessageType} Registed!`); 
        Server.Instance.onMessage(this.MessageType, (client, message) => {    
            
             console.log(Object.getOwnPropertyNames(message).length); 
             const msg = message as ReqChangeTransform;  
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