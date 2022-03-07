
 유저들끼리 자유롭게 보드게임 승부가 가능한 보드게임 카페 구현
 - 방에 있는 여분의 보드게임 테이블에 앉아서 자유롭게 플레이 하면 됨 
  
 
 게임 종류 (각 게임별 확장가능한 구조로 n개 테이블로 구성)
 개발예상기간 : 3-4일
 
 
 
 
 ## 2인 보드게임 장르 (중 2~3개만 구현)
  4인 게임의 경우 최대한 중간 퇴장자에 대한 처리가 가능한 게임으로 넣기. 
  이런 경우가 아니면 AI코드를 넣어야함. 무난하게 블랙잭 or 홀덤이 좋을 듯.
  
 - 오목         (2명까지 참여가능)
 - 체스         (2명까지 참여가능)
 - 틱택토       (2명까지 참여가능) 
 - 블랙잭       (4명까지 참여가능)
 - 홀덤         (4명까지 참여가능) 
 - 같은그림찾기(Maple)  (2명까지 참여가능)
 - 

### Memo
 Table : 보드게임 테이블

 C-S 메세지 정의 
 -  ReqCreateBoardGame (Table)  | 보드게임 생성
 -  ReqJoinBoardGame (Table) | 보드게임에 입장, 시트 배정 
 -  ReqLeaveBoardGame   | 보드게임에서 퇴장시 호출 
 -  ReqStartBoardGame  | 방장(CreateBoardGame 호출자) 가 시작가능

 S-C 메세지 정의
 -  NotifyCreateBoardGame  | 보드게임 생성된 경우 알람 
 -  NotifyJoinBoardGame    | 보드게임 입장시 알람
 -  NotifyLeaveBoardGame   | 보드게임 퇴장시 알람
 -  NotifyStartBoardGame   | 보드게임 시작시 알람
 -  NotifyGameResult       | 게임결과 메세지  

 State 정의
 -  SyncTransform

 Storage 정의
 -  ZepetoChip             | 보드게임카페 칩
