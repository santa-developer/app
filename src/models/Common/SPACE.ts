export interface HispCategoryVO {
  hispCtgrMgmtNmbr: string //하이스페이스 카테고리 관리 번호
  ctgrName: string //카테고리명
  ctgrEpln: string //카테고리 설명
  ctgrUseYn: string //카테고리 사용 여부
  ctgrClss: string //카테고리 클래스
  ctgrMesgCode: string //카테고리 메시지 코드
  ctgrFileMgmtNmbr: string //카테고리 파일 관리 번호
  ctgrordr: number //카테고리 순번
  spaceCnt: number // 카테고리의 스페이스 갯수
}

export interface RecommendSpace {
  hispMgmtNmbr: string //하이스페이스 관리번호
  hispName: string //스페이스 이름
  logoFileMgmNmbr: string //로고파일 관리번호
  thnlMgmNmbr: string //썸네일 관리번호
  hispId: string //스페이스 아이디
}

export interface SpaceCategory {
  hispMgmtNmbr: string
  hispName: string
  hispInf: string
  logoFileMgmtNmbr: string
  thnlMgmtNmbr: string
  flwgCnt: number
  vstrCnt: number
  rank: number
  myFlwgCnt: number
  bltbCnt: number
  bltbVoteCnt: number
  bltbLikeCnt: number
  qestCnt: number
  todayVstrCnt: number
  newBltbCnt: number
  ctgrName: string
  ctgrMesgCode: string
  postCnt: number
}
