/* import시 싱글턴 순환 참조를 피하기 위해서 만들었다. */

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