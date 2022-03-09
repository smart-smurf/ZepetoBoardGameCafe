// import { RoomData } from "ZEPETO.Multiplay";


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