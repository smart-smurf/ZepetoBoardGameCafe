import { Vector3 } from 'UnityEngine';
import { CharacterState, ZepetoCharacter, ZepetoPlayer } from 'ZEPETO.Character.Controller';
import { Player } from 'ZEPETO.Multiplay.Schema';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'; 

export default class NetworkPlayerSynchronizer extends ZepetoScriptBehaviour {
    player: Player;
    zepetoPlayer: ZepetoPlayer;
    Initialize(player: Player, zepetoPlayer: ZepetoPlayer) { 
        this.player = player;
        this.zepetoPlayer = zepetoPlayer; 
        console.log("[NetworkPlayerSynchronizer] Initialize..");
        this.player.OnChange += () => {
            this.zepetoPlayer.character.MoveToPosition(new Vector3(this.player.transform.position.x, this.player.transform.position.y, this.player.transform.position.z));
            if (player.state === CharacterState.JumpIdle || player.state === CharacterState.JumpMove)
                zepetoPlayer.character.Jump();
        }
        
    }

}