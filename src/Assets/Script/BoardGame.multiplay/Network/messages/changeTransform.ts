import { TransformSchema, Vector3Schema } from "ZEPETO.Multiplay.Schema";
import { ReqChangeTransform } from "../../Common/Message";
import Server from "../../server";
import Protocol from "../protocol";
import { getPlayer } from "../service/player"; 
export default class ChangeTransform extends Protocol {  
    public get MessageType(): string {
        return "ReqChangeTransform"
    }

    public Regist(): void { 
        console.log(`${this.MessageType} Registed!`);
        Server.Instance.onMessage(this.MessageType, (client, message) => {  
             
            console.log('hi');

             const msg = message as ReqChangeTransform; 
             const player = getPlayer(client);
             const transform = new TransformSchema();

             console.log(`수신 : ${msg.position.x} ${msg.position.y} ${msg.position.z}`);
             transform.position = new Vector3Schema();
             transform.position.x = msg.position.x;
             transform.position.y = msg.position.y;
             transform.position.z = msg.position.z;

             transform.rotate = new Vector3Schema();
             transform.rotate.x = msg.rotation.x;
             transform.rotate.y = msg.rotation.y;
             transform.rotate.z = msg.rotation.z;
             
             player.transform = transform;
        });
    }
 
}