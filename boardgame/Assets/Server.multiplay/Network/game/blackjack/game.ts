import { SandboxPlayer } from "ZEPETO.Multiplay";
import { getPlayer } from "../../service/player";
import { addPlayerToTable, removePlayerOnTable } from "../../service/table";
import { GameBase } from "../gamebase";
import { Card } from "./card";
import { Dealer } from "./dealer";
import { Player } from "./player";

/**
 * Rules
 *  - A는 1또는 11로 계산한다. (A를 제외한 모든 숫자를 합친 후 나머지 A를 합칠때 21이 초과하지 않는 유리한 숫자로 계산하면 된다.)
 *  - KQJ는 10으로 계산한다. 
 *  - 딜러는 자신의 카드가 16점 이하라면 반드시 1장을 더 받아야한다.
 *  - 딜러는 자신의 카드가 17점 이상이라면 더이상 카드를 받을 수 없다. (소프트 17도 포함)
 *  
 *  - 배팅 이후 플레이어에게 1장씩 카드를 돌린다.  이때 플레이어 카드는 Face Up (무조건), 딜러는 Face Down으로 돌린다.
 *  - 한번 더 배팅한다. 이떄 딜러 카드는 Face Up으로 돌린다.
 */
export class Game extends GameBase {

    public players = Array<Player>();
    public dealer  = new Dealer();
    public cards   = Array<Card>(); 

    
    public OnPlayerJoin(client: SandboxPlayer): void {
        const player = getPlayer(client);
        addPlayerToTable(this.gameTable,  player); 
        this.players.push(new Player(player));
    }

    public OnPlayerLeave(client: SandboxPlayer): void {
        const player = getPlayer(client);
        removePlayerOnTable(this.gameTable, player);
        this.players = this.players.filter(x=> x.refPlayerState.sessionId !== player.sessionId);
    }

    public GetPlayer(client:SandboxPlayer): Player{ 
        const player = getPlayer(client);
        return this.players.find(x=> x.refPlayerState.sessionId === player.sessionId);
    } 
}