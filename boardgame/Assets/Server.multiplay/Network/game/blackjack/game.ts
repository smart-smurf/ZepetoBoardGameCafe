import { SandboxPlayer } from "ZEPETO.Multiplay";
import { GameTableState } from "../../../Common/Enums";
import { getPlayer } from "../../service/player";
import { addPlayerToTable, removePlayerOnTable } from "../../service/table";
import { GameBase } from "../gamebase";
import { Card } from "./card";
import { Dealer } from "./dealer";
import { Player } from "./player";
import { PlayerBase } from "./playerBase";

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
    public dealer = new Dealer();
    public cards = Array<Card>();
    

    public onPlayerJoin(client: SandboxPlayer): void {
        const player = getPlayer(client);
        addPlayerToTable(this.gameTable, player);
        this.players.push(new Player(player));
    }

    public onPlayerLeave(client: SandboxPlayer): void {
        const player = getPlayer(client);
        removePlayerOnTable(this.gameTable, player);
        this.players = this.players.filter(x => x.refPlayerState.sessionId !== player.sessionId);
    }

    public onTick(tick : number){
        
    }
    
    getPlayer(client: SandboxPlayer): Player {
        const player = getPlayer(client);
        return this.players.find(x => x.refPlayerState.sessionId === player.sessionId);
    }
 
 
    /**
     * 플레이어에게 카드지급
     */
    giveCard(player: PlayerBase, isFaceDown : boolean = false) {
        const card = this.cards.pop();
        if(isFaceDown){ 
            player.addCard(card);
        } 
        else{
            card.FaceDown = true;
            player.addCard(card);
        }
    }  

    
    public onGameStart(){ 
        this.initializeCardList(); 
        this.changeState(GameTableState.PLAYING);
        this.giveFirstCard(); 
    } 

    public onStand(player : Player){

    }

    public onHit(player : Player){

    }

    public onPlayerBat(player : Player, coin : number){
        player.batCoin = coin;
    }
    
    public onPlayerDie(player : Player){
        player.lose = true;
    }

    giveFirstCard(){
        // 게임을 시작한다.
        this.giveCard(this.dealer);
        this.players.forEach(player=>{
            this.giveCard(player);
        });
        
        this.giveCard(this.dealer, true);
        this.players.forEach(player=>{
            this.giveCard(player);
        });
    }

    
    initializeCardList() {
        this.cards = [];
        const shapeCount = 4;
        const min = 1; // A
        const max = 13; // K
        for (let shape = 0; shape < shapeCount; shape++) {
            for (let number = min; number < max + 1; number++) {
                const card = new Card(shape, number);
                this.cards.push(card);
            }
        } 
        this.shuffle(this.cards); 
    } 

    shuffle(array : Array<Card>) {
        let currentIndex = array.length, randomIndex; 
        while (currentIndex != 0) { 
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--; 
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        } 
        return array;
    }
}