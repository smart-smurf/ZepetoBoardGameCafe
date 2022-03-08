declare module "ZEPETO.Multiplay.Schema" {

	import { Schema, MapSchema, ArraySchema } from "@colyseus/schema"; 


	interface State extends Schema {
		players: MapSchema<Player>;
		tables: MapSchema<GameTable>;
	}
	class Player extends Schema {
		sessionId: string;
		userId: string;
		hash: string;
		animationClip: string;
		state: number;
		transform: TransformShema;
		currentTableId: number;
	}
	class Vector3Shema extends Schema {
		x: number;
		y: number;
		z: number;
	}
	class TransformShema extends Schema {
		position: Vector3Shema;
		rotate: Vector3Shema;
	}
	class GameTable extends Schema {
		tableId: number;
		gameType: number;
		status: number;
		maxPlayer: number;
		owner: Player;
		players: ArraySchema<Player>;
	}
}