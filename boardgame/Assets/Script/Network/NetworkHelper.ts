import { Quaternion, Vector2, Vector3 } from "UnityEngine";
import { RoomData } from "ZEPETO.Multiplay";

export default class NetworkHelper { 
    private static IsValue(length: number) {
        return length === 0;
    }

    private static SerializeSingleObject(data: any): RoomData {
        const roomData = new RoomData();
        const props = Object.getOwnPropertyNames(data);
        props.forEach(prop => {
            const value = data[prop];
            const fieldName = prop;
            roomData.Add(fieldName, value);
        });
        return roomData;
    } 
    /**
     * 현재는 객체 내에 객체가 중첩상태로 있는경우에는 직렬화 불가능함.
     */
    public static SingleObjectToRoomData(data: any): RoomData {
        return this.SerializeSingleObject(data);
    } 
}



// export default class NetworkHelper {
//     public static CreatePacket(data : any, name : string = null, root : RoomData = null) : RoomData {
//         // 룸데이터가 없는경우 생성
//         if(root === null){
//             root = new RoomData(); // 첫 진입시엔 루트 룸데이터가 된다. 
//             console.log("최초 부모생성");
//         }
//         else{
//             console.log(`${name} : ${data} 를 부모에 넣음`);
//             root.Add(name, data);
//         }

//        //대상의 프로퍼티를 읽는다.
//         const properties = Object.getOwnPropertyNames(data);

//         // 프로퍼티가 1개 이상인경우 RoomData를 생성후 상위 룸데이터에 추가한다.
//         if(properties.length >= 1){
//             properties.forEach(x=>{  
//                 const roomData = new RoomData();
//                 const targetProp = data[x]; // object
//                 const propName = x;   
//                 return this.CreatePacket(targetProp, propName, roomData)
//             });
//         }  

//         return root;
//     }
// }