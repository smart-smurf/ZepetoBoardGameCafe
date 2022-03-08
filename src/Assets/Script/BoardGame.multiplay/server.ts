/* import시 싱글턴 순환 참조를 피하기 위해서 만들었다. */
/* 
 case ->

 index.ts creategame.ts를 import 한 후
 creategame.ts 에서도 index.ts에 있는 싱글톤을 사용하는경우 index.ts를 import 하게되면
 서로간의 순환참조가 되어버리므로 순환참조 오류가 나서 이렇게 따로 싱글턴용
 스크립트를 작성했다. 나중에 이 구조를 수정할 수 있는 방법을 찾아야 할듯

*/
import { Sandbox } from "ZEPETO.Multiplay";

export default class Server{
    public static get Instance() : Sandbox{
        return this._instance;
    }  
    public static set Instance(value : Sandbox){
        this._instance = value;
    }  

    private static _instance : Sandbox;
}