export enum GameType {
    BlackJack = 0,
    TicTacToe = 1
}

export enum GameTableState{
    READY = 0,
    PLAYING = 1,
    END = 2
} 

export enum GameState {
    NONE = 0,
    LOADING = 1,  // 캐릭터 및 리소스 로딩, 데이터 불러오기, 네트워크 관련 셋업 등 플레이를 하기 전의 모든 과정
    FAILED = 2,
    COMPLETE = 3,
}