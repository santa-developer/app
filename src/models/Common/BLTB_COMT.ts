import EX_CREATOR_MODIFIER from '@models/EX_CREATOR_MODIFIER'

// 게시판 댓글
export default class BLTB_COMT extends EX_CREATOR_MODIFIER {
  public dfrcComtMgmtNmbr!: string // 상위 댓글 관리 번호
  public comtLevl!: string // 댓글 레벨
  public delYn!: string // 삭제 여부
  public deluserid!: string // 삭제자
  public deldatetime!: string // 삭제일시
  public postDvsnCode!: string // 게시물 구분 코드
  public comtCnt = 0 // 댓글 횟수
  public likeCnt = 0 // 좋아요 횟수
  public decCnt = 0 // 신고 횟수
  public decCode = '' // 신고코드

  public children: BLTB_COMT[] = [] // 하위댓글 - Not in DB

  public userId!: string // 사용자 로그인 ID - Not in DB
  public mebrFileMgmtNmbr!: string // 회원 파일 관리 번호 - Not in DB

  public myLikeCnt = 0 // 좋아요 상태 : 1, 원상태 : 0 - Not in DB

  public comtMgmtNmbr!: string // 댓글 관리 번호
  public postMgmtNmbr!: string // 게시물 관리 번호
  public comtCott!: string // 댓글 내용
}
