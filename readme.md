 
 ## 제페토 공식 멀티플레이 샘플과 비교

개선 프로젝트 및 실험용 프로젝트

## 2인 보드게임 장르 (중 2~3개만 구현)
  4인 게임의 경우 최대한 중간 퇴장자에 대한 처리가 가능한 게임으로 넣기. 
  이런 경우가 아니면 AI코드를 넣어야함. 무난하게 블랙잭 or 홀덤이 좋을 듯.
  
 - 오목         (2명까지 참여가능)
 - 체스         (2명까지 참여가능)
 - 틱택토       (2명까지 참여가능) 
 - 블랙잭       (4명까지 참여가능)
 - 홀덤         (4명까지 참여가능) 
 - 같은그림찾기(Maple)  (2명까지 참여가능)
 

## 현재 문제점 (서버)
 - 제페토 멀티 예제의  onCreate()  를 보면 각 메세지 별로 처리해야 하는 코드가 많아서 지저분함. 
 - 제페토 예제서버의  index.ts 를 보면 코드가 너무 길고 복잡함.
 - 예제에서는 onChangedTransform, onChangedState 밖에 없어 수신받는 메세지가 2개 뿐이지만 만약 메세지 가 100개 가 넘어가는 복잡한 서버를 구현해야 한다면..?
 
  결론 : 엄청 복잡한 게임의 경우 서버 코드가 관리하기 힘들 정도로 index.ts에 몰리는 현상이 발생

## 개선 (서버)
 - index.ts를 관리하기 위해 처리를 [messages](https://github.com/shlifedev/ZepetoBoardGameCafe/tree/main/src/Assets/Script/BoardGame.multiplay/Network/messages) 에서 관리
 - 실제 스키마에 접근하거나 스키마에서 데이터를 가져오는 서비스 코드 관리는 [service](https://github.com/shlifedev/ZepetoBoardGameCafe/tree/main/src/Assets/Script/BoardGame.multiplay/Network/service) 에서처리
 - 위에 언급한 내용들을 실제 처리하기위해 index.ts를 싱글톤으로 만들되, 순환참조를 방지하기 위해 [server.ts](https://github.com/shlifedev/ZepetoBoardGameCafe/blob/main/src/Assets/Script/BoardGame.multiplay/server.ts) 에 싱글턴 
 - 이렇게 분리만 해도 [index.ts](https://github.com/shlifedev/ZepetoBoardGameCafe/blob/main/src/Assets/Script/BoardGame.multiplay/index.ts)는 굉~장히 깔끔해진다.


클라이언트도 개선 작업중
 
