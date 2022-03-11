import { Message } from "../../Common/Message";
import Server from "../../server";
import Protocol from "../protocol";
import { getPlayer } from "../service/player";
import { addPlayerToTable } from "../service/table";

export default class CreateGame extends Protocol {  
    public get MessageType(): string {
        return "ReqCreateGame"
    }

    public regist(): void { 
        Server.Instance.onMessage(this.MessageType, (client, message) => {
            console.log('onMessage');
            const req = message as Message.Table.ReqCreateGame;
            const player = getPlayer(client);
            const table = Server.Instance.state.tables.get(req.tableId.toString());
            addPlayerToTable(table, player);  

            // 방 생성 알림에 대한 메세지생성
            let notifyMsg: Message.Table.NotifyCreateGame = {
                onwerSessionId: player.sessionId,
                table: table.tableId,
            }
            Server.Instance.broadcast("NotifyCreateGame", notifyMsg);
        });
    }
 
}