import { Sandbox, SandboxOptions, SandboxPlayer } from "ZEPETO.Multiplay";

export default class extends Sandbox {

    onCreate(options: SandboxOptions) {
        this.onMessage("test", (client , message)=>{});
    }

    onJoin(client: SandboxPlayer) {
     
    }

    onLeave(client: SandboxPlayer, consented?: boolean) {
        
    }
}   