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
		transform: TransformSchema;
		currentTableId: number;
	}
	class Vector3Schema extends Schema {
		x: number;
		y: number;
		z: number;
	}
	class TransformSchema extends Schema {
		position: Vector3Schema;
		rotate: Vector3Schema;
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