export interface AtvtBltbProps {
  postMgmtNmbr: string // 게시글 관리번호
  mebrMgmtNmbr: string // 회원 관리번호
  bltbThnl: string // 게시글 썸네일
  newLikeRCnt: number // 좋아요 받은 수
  newHateRCnt: number // 싫어요 받은 수
  hunterCnt: number // 헌터 점수
  bltbType: string // 조회할 게시글 종류 (like:좋아요, hate:싫어요, hunter:헌터)
}
