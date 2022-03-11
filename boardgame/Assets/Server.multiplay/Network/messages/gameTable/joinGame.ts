import { SandboxPlayer } from "ZEPETO.Multiplay";
import { Message } from "../../../Common/Message";
import Server from "../../../server";
import Protocol from "../../protocol";
import { getPlayer } from "../../service/player";
import { addPlayerToTable } from "../../service/table";

export default class JoinGame extends Protocol {  
    public get MessageType(): string {
        return "ReqJoinGame"
    }

    public regist(): void { 
        Server.Instance.onMessage(this.MessageType, (client, message) => {
            console.log(`ReqJoinGame sid-> ${client.sessionId}`);
            const req = message as Message.Table.ReqJoinGame;
            const player = getPlayer(client);
            const table = Server.Instance.state.tables.get(req.tableId.toString()); 
            addPlayerToTable(table, player);   


            
            const players = Array<Message.Serialize.Player>();
            table.players.map(player=> player.sessionId).forEach(sessionId=>{
                players.push({
                    sessionId
                });
            }); 


            // 방 생성 알림에 대한 메세지생성
            let notifyMsg: Message.Table.NotifyJoinGame = {
                senderSessionId : client.sessionId,
                onwerSessionId: table.owner.sessionId,
                tableId: table.tableId,
                maxPlayer : table.maxPlayer,
                currentPlayer : table.players.length,
                players : players
            } 

            
            Server.Instance.broadcast("NotifyJoinGame", notifyMsg);
        });
    }
 
}