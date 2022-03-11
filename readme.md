제페토 멀티플레이 서버로 통신 구조가 다소 복잡한 게임을 구현해보는것이 목표 

**서버 소스코드** [링크](./boardgame/Assets/Server.multiplay)

## How to Contribute 
 보드게임카페에 필요한 서버로직은 `Pull reqeust`를 통하여 기여 가능합니다.  
 서버에서 시뮬레이션 되는 게임은 블랙잭의 예시와 같이`GameBase`를 상속받아 직접 게임을 구현하면 됩니다.   
 
 - [블랙잭 서버](./boardgame/Assets/Server.multiplay/Network/game/blackjack) // 구현 진행중
 - [틱택토 서버](./boardgame/Assets/Server.multiplay/Network/game/tactactoe) // 미구현
 - [블랙잭 클라이언트](.) // 미구현
 - [틱택토 클라이언트](.) // 미구현
 
### Goal
  4인 게임의 경우 최대한 중간 퇴장자에 대한 처리가 가능한 게임으로 넣기. 
  이런 경우가 아니면 AI코드를 넣어야함. 무난하게 블랙잭 or 홀덤이 좋을 듯. 

 - 틱택토       (2명까지 참여가능) 
 - 블랙잭       (4명까지 참여가능)


 첫번째 게임으론 블랙잭으로 해보는게 좋을 듯
