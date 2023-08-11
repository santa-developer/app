import EX_CREATOR_MODIFIER from '@models/EX_CREATOR_MODIFIER'

// 하이스페이스 카테고리
export default class HISP_CTGR extends EX_CREATOR_MODIFIER {
  public ctgrEpln!: string // 카테고리 설명
  public ctgrUseYn!: string // 카테고리 사용 여부
  public ctgrClss!: string // 카테고리 클래스
  public ctgrMesgCode!: string // 카테고리 메세지 코드
  public ctgrFileMgmtNmbr!: string // 카테고리 파일 관리 번호
  public ctgrOrdr = 0 // 카테고리 순번

  public spaceCnt = 0 // 카테고리의 스페이스 갯수 - Not in DB

  public schBltbCnt = 0 // 카테고리의 게시글 갯수 - Not in DB

  constructor(
    public hispCtgrMgmtNmbr: string, // 하이스페이스 카테고리 관리 번호
    public ctgrName: string // 카테고리 명
  ) {
    super()
  }
}
