import { Vector3 } from "UnityEngine";
import { Vector3Schema } from "ZEPETO.Multiplay.Schema";




export function SchemaToVector3(vector: Vector3Schema): Vector3 {
    return new Vector3(vector.x, vector.y, vector.z);
} 