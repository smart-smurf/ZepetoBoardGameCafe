import { Vector3 } from "UnityEngine";
import { Vector3Schema } from "ZEPETO.Multiplay.Schema";




export function SchemaToVector3(vector: Vector3Schema): Vector3 {
    return new Vector3(vector.x, vector.y, vector.z);
}
export function Vector3ToSchema(vector: Vector3): Vector3Schema {
    const schema = new Vector3Schema();
    schema.x = vector.x;
    schema.y = vector.y;
    schema.z = vector.z;
    return schema;
}   