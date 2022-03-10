import { SandboxPlayer } from "ZEPETO.Multiplay";
import { Player, TransformSchema } from "ZEPETO.Multiplay.Schema";
import Server from "../../server";

export function getPlayer(client: SandboxPlayer) {
    return Server.Instance.state.players.get(client.sessionId);
} 

export function updatePlayerTransform(client: SandboxPlayer, transform : TransformSchema){
    const player = getPlayer(client);
    if(player !== null){ 
        console.log(`player ${player.sessionId} transform update to ${transform.position.x},${transform.position.y},${transform.position.z}`)
       player.transform = transform;
    }
    else{
        throw new Error(`Cannot found player ${client.sessionId}`);
    }
}

export function addPlayer(client: SandboxPlayer){
    console.log(`[OnJoinPlayer] ${client.sessionId} ${client.userId}`);
    const player = new Player();
    player.sessionId = client.sessionId;
    player.hash = client.hashCode;
    player.userId = client.userId;

    const transform = new TransformSchema();
    player.transform = transform;
    player.currentTableId = 0; 
    Server.Instance.state.players.set(player.sessionId, player);
}

export function leavePlayer(client: SandboxPlayer){
    Server.Instance.state.players.delete(client.sessionId);
}