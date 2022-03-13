import { Message } from "../../../Common/Message";
import Server from "../../../server";
import Protocol from "../../protocol";
import { getPlayer } from "../../service/player";
import { addPlayerToTable, findGameTableById, removePlayerOnTable } from "../../service/table";

export default class LeaveGame extends Protocol {  
    public get MessageType(): string {
        return "ReqLeaveGame"
    }

    public regist(): void { 
        Server.Instance.onMessage(this.MessageType, (client, message) => {
            console.log(`ReqLeaveGame sid-> ${client.sessionId}`); 
            const player = getPlayer(client);  
            const table  = findGameTableById(player.currentTableId); 
            removePlayerOnTable(player);       
            const players = new Array<Message.Serialize.Player>();

            if (table.players.length !== 0) {
                table.players.map(player => player.sessionId).forEach(sessionId => {
                    players.push({
                        sessionId
                    });
                });
            }

            // 방 생성 알림에 대한 메세지생성
            let notifyMsg: Message.Table.NotifyLeaveGame = {
                senderSessionId : client.sessionId,
                onwerSessionId: table.owner.sessionId,
                tableId: table.tableId,
                leavePlayer : player.sessionId, 
                maxPlayer : table.maxPlayer,
                currentPlayer : table.players.length,
                players : players
            } 

            
            Server.Instance.broadcast("NotifyLeaveGame", notifyMsg);
        });
    }
 
}