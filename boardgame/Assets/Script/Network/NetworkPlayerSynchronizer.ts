import { Vector3 } from 'UnityEngine';
import { CharacterState, ZepetoCharacter, ZepetoPlayer } from 'ZEPETO.Character.Controller';
import { Player } from 'ZEPETO.Multiplay.Schema';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import GameManager from '../GameManager'

export default class NetworkPlayerSynchronizer extends ZepetoScriptBehaviour {
    player: Player;
    zepetoPlayer: ZepetoPlayer;
    initialized: boolean;
    Initialize(player: Player, zepetoPlayer: ZepetoPlayer) {

        if (this.initialized === false) {
            this.initialized = true;
            this.player = player;
            this.zepetoPlayer = zepetoPlayer;
            this.player.OnChange += () => {
                this.zepetoPlayer.character.MoveToPosition (new Vector3(this.player.transform.position.x, this.player.transform.position.y, this.player.transform.position.z));
                if (player.state === CharacterState.JumpIdle || player.state === CharacterState.JumpMove)
                zepetoPlayer.character.Jump();
            }  
        }
    }

}