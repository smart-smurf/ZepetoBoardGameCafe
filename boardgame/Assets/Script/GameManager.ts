import { GameObject, Quaternion, WaitUntil, WaitWhile } from 'UnityEngine';
import { SpawnInfo, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { Room } from 'ZEPETO.Multiplay'
import { Player, State, Vector3Schema } from 'ZEPETO.Multiplay.Schema';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoWorldMultiplay } from 'ZEPETO.World';
import MessageDispatcher from './MessageDispatcher';
import { GameState } from './Network/Common/Enums';
import NetworkPlayer from './Network/NetworkPlayer';
import NetworkPlayerSynchronizer from './Network/NetworkPlayerSynchronizer';
import { SchemaToVector3 } from './Parser';




export default class GameManager extends ZepetoScriptBehaviour {


    private static _instance: GameManager = null;
    public static get Instance(): GameManager {
        if (this._instance == null) {
            this._instance = GameObject.FindObjectOfType<GameManager>();
        }
        return this._instance;
    }


    public multiplay: ZepetoWorldMultiplay;

    private networkPlayer: NetworkPlayer;
    public get NetworkPlayer(): NetworkPlayer { return this.networkPlayer; }

    private room: Room;
    private gameState: GameState;
    private roomJoined: boolean;


    public get Room(): Room {
        return this.room;
    }

    *GameInitialize() {
        this.gameState = GameState.LOADING;
        console.log("[Initialize]wait room create..");
        yield new WaitWhile(() => this.room === null); // 방 입장 대기
        console.log("[Initialize]room created, try join room..");
        yield new WaitWhile(() => !this.roomJoined);  // 방 입장후 입장 완료까지 대기
        console.log("[Initialize]done");
    }



    /**
   * 플레이어 입장콜백 
   */
    private OnJoinPlayer(sessionId: string, player: Player) {
        console.log(`[OnJoinPlayer] players - sessionId : ${sessionId}`);

        const spawnInfo = new SpawnInfo();

        const position = SchemaToVector3(player.transform.position);
        const rotation = SchemaToVector3(player.transform.rotate);
        spawnInfo.position = position;
        spawnInfo.rotation = Quaternion.Euler(rotation);

        //캐릭터 생성
        const isLocal = this.room.SessionId === player.sessionId;
        ZepetoPlayers.instance.CreatePlayerWithUserId(sessionId, player.userId, spawnInfo, isLocal);


    }

    /**
     * 플레이어 삭제 콜백
     */
    private OnRemovePlayer(sessionId: string, player: Player) {
        console.log(`[OnRemove] players - sessionId : ${sessionId}`);
        ZepetoPlayers.instance.RemovePlayer(sessionId);
    }


    private OnStateChange(state: State, isFirst: boolean) {
        if (isFirst) {
            state.players.ForEach((sessionId: string, player: Player) => this.OnJoinPlayer(sessionId, player));
            state.players.OnAdd += (player: Player, sessionId: string) => this.OnJoinPlayer(sessionId, player);
            state.players.OnRemove += (player: Player, sessionId: string) => this.OnRemovePlayer(sessionId, player);

            ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
                // 플레이어 설정.. 
                const myPlayer = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer;
                const characterGo = myPlayer.character.gameObject;
                this.networkPlayer = characterGo.AddComponent<NetworkPlayer>();
                this.networkPlayer.Initialize(myPlayer.character, myPlayer); 
            });

            ZepetoPlayers.instance.OnAddedPlayer.AddListener((sessionId: string) => {
                if (this.room.SessionId !== sessionId) {
                    const playerState: Player = this.room.State.players.get_Item(sessionId);
                    const zepetoPlayer = ZepetoPlayers.instance.GetPlayer(sessionId);
                    const characterGo = zepetoPlayer.character.gameObject;
                    characterGo.AddComponent<NetworkPlayerSynchronizer>().Initialize(playerState, zepetoPlayer);
                }
            });
        }
        else {

        }
    }




    Start() {
        this.multiplay.RoomCreated += (room: Room) => {
            this.room = room;
            MessageDispatcher.Instance.Init(this.room);
        };

        this.multiplay.RoomJoined += (room: Room) => {
            this.roomJoined = true;
            room.OnStateChange += this.OnStateChange;
        };
        this.StartCoroutine(this.GameInitialize());
    }
}