import { Button } from 'UnityEngine.UI'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameManager from '../GameManager';

export default class TestScript extends ZepetoScriptBehaviour {

    buttonJoinGame : Button; 
    buttonLeaveGame : Button; 
    Start() {    
        this.buttonJoinGame.onClick.AddListener(()=>{
            const np = GameManager.Instance.NetworkPlayer;
            np.ReqJoinGame({
                tableId : 1001
            });
        });
        
        this.buttonLeaveGame.onClick.AddListener(()=>{
            const np = GameManager.Instance.NetworkPlayer;
            np.ReqLeaveGame({
                tableId : 1001
            });
        });
    }

}