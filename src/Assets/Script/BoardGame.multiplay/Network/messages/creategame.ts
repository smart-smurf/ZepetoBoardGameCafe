import Server from "../..";
import { NotifyCreateGame, ReqCreateGame } from "../../Common/Message";
import Protocol from "../protocol";
import { addPlayerToTable, getPlayer } from "../service/table";

export default class CreateGame extends Protocol {  
    public get MessageType(): string {
        return "ReqCreateGame"
    }

    public Regist(): void { 
        Server.Instance.onMessage(this.MessageType, (client, message) => {
            console.log('onMessage');
            const req = message as  ReqCreateGame;
            const player = getPlayer(client);
            const table = Server.Instance.state.tables.get(req.tableId.toString());
            addPlayerToTable(table, player);  
            let notifyMsg: NotifyCreateGame = {
                onwerSessionId: player.sessionId,
                table: table.tableId,
            }
            Server.Instance.broadcast("NotifyCreateGame", notifyMsg);
        });
    }
 
}