
제페토로 구현한 보드게임 카페

**서버 소스코드** [링크](./boardgame/Assets/Server.multiplay)

## How to Contribute 
 보드게임카페에 필요한 서버로직은 `Pull reqeust`를 통하여 기여 가능합니다.  
 서버에서 시뮬레이션 되는 게임은 블랙잭의 예시와 같이`GameBase`를 상속받아 직접 게임을 구현하면 됩니다.   
 
 - [블랙잭 서버](./boardgame/Assets/Server.multiplay/Network/game/blackjack) // 구현 진행중
 - [틱택토 서버](./boardgame/Assets/Server.multiplay/Network/game/tactactoe) // 미구현
 - [블랙잭 클라이언트](.) // 미구현
 - [틱택토 클라이언트](.) // 미구현
 
### Goal
 제페토 멀티플레이 서버로 통신 구조가 다소 복잡한 게임을 구현해보는것이 목표 
 턴제로 진행되는 보드게임만 서포트 (애초에 보드게임인데 턴제가 아닌게 있나..? 보드게임 안해서 잘 모르겠당!)
 
 구현 하려고 하는 게임은 아래와 같다. (구조상 동적으로 더 많은 보드게임을 추가 가능)
 
 - 틱택토       (2명까지 참여가능) 
 - 블랙잭       (4명까지 참여가능)   
