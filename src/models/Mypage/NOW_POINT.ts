export interface WeeksStkgProps {
  mebrMgmtNmbr: string
  wknbMgmtNmbr: string
  stkgClas: string //금주 스테이킹 등급
  stkgRank: string
  stkgCunt: string // 가중치
}

export interface WknbMgmtProps {
  wknbMgmtNmbr: string //주차관리번호
  wkndYear: string //주차 연도
  wkndMonth: string // 주차 월
  wkndSttdate: string // 시작날짜
  wkndEnddate: string // 종료날짜
  wknb: string //주차
  intervalDay: number
  weekPoitRegYn: string // 주간활동 포인트 배치 실행 여부
  weekRwdRegYn: string // 주간 리워드 배치 실행 여부
  weekClasHuntRegYn: string // 금주 스테이킹 등급 선정 및 헌터 선정 배치 완료 여부 (y:집계완료, n:집계중)
}

export interface RwdPoitProps {
  rwdPoitMgmtNmbr: string // 리워드 점수 관리번호
  atvtLikePoit: string // 좋아요 활동 보상 점수 (하기)
  atvtLikePoitR: string // 좋아요 활동 보상 점수 (받기)
  atvtVotePoitF: string // 직접등록 보팅점수(하기)
  atvtVotePoitFR: string // 직접등록 보팅점수 (받기)
  atvtVotePoitC: string // 큐레이션 보팅점수(하기)
  atvtVotePoitCR: string // 큐레이션 보팅 점수(받기)
  atvtSarePoit: string //게시물 공유 점수
  admContsPoit: string // 운영자 활동 점수
  admVstrPoit: string // 방문자 수 별 점수
  admFlwrPoit: string // 누적 팔로워 수
  hterDecPoit: string // 헌터 보상
  evnt1clasRwdRto: string //이벤트 보상1등급
  evnt2clasRwdRto: string //이벤트 보상2등급
  evnt3clasRwdRto: string //이벤트 보상3등급
  evnt4clasRwdRto: string //이벤트 보상4등급
  evnt5clasRwdRto: string //이벤트 보상5등급
  atvtNewLikePoitC: string
  atvtNewLikePoitF: string
  atvtNewHatePoitC: string
  atvtNewHatePoitF: string
}

export interface AtvPointProps {
  recSCnt: string //추천 한 수
  recRCnt: string // 추천 받은 수
  likeSCnt: string // 좋아요 한 수
  likeRCnt: string // 좋아요 받은 수
  shareCnt: string // 공유 수
  hunterCnt: string // 헌터 신고 수
  recSPnt: string // 추천 한 점수
  recRPnt: string // 추천 받은 점수
  likeSPnt: string // 좋아요 한 점수
  likeRPnt: string // 좋아요 받은 점수
  sharePnt: string // 공유 점수
  hunterPnt: string // 헌터 점수
  newLikeRCnt: string //신규 좋아요 받은 수
  newLikeRPnt: string // 신규 좋아요 받은 점수
  newHateRCnt: string //신규 싫어요 받은 수
  newHateRPnt: string // 신규 싫어요 받은 점수
  mebrMgmtNmbr: string // 사용자 관리번호
}
