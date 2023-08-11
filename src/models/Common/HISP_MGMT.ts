import EX_CREATOR_MODIFIER from '@models/EX_CREATOR_MODIFIER'
import ATCM from './ATCM'
import HISP_CTGR from './HISP_CTGR'

// 하이스페이스
export default class HISP_MGMT extends EX_CREATOR_MODIFIER {
  public mebrMgmtNmbr!: string // 회원관리번호
  public hispMgmtNmbr!: string // 하이스페이스 관리 번호
  public hispName!: string // 하이스페이스 명
  public dmiAdrs!: string // 도메인 주소
  public hispInf!: string // 하이스페이스 소개
  public hispId!: string // 하이스페이스 아이디
  public webUrl!: string // 사이트
  public delYn: 'Y' | 'N' = 'Y' // 삭제 여부
  public opYn: 'Y' | 'N' = 'Y' // 공개 여부
  public searchYn: 'Y' | 'N' = 'N' // 스페이스 검색 허용(비공개인경우)
  public hispSttsCode!: string // 하이스페이스 상태코드
  public flwgCnt = 0 // 팔로우 수
  public vstrCnt = 0 // 방문자 수
  public nteExpsYn: 'Y' | 'N' = 'Y' // 공지사항 노출 여부
  public qestExpsYn: 'Y' | 'N' = 'Y' // 퀘스트 노출 여부
  public topExpsYn: 'Y' | 'N' = 'Y' // 미디어 top10 노출 여부
  public mediaViewType: '1' | '2' | '3' = '2' // 미디어 보기 타입
  public modHispNameYn: 'Y' | 'N' = 'Y' // 스페이스명 수정가능여부
  public hispNameModdatetime!: number // 스페이스명 수정일시
  public favYn: 'Y' | 'N' = 'N' // 즐겨찾기 여부
  public myFlwgRequestYn: 'Y' | 'N' = 'N' // 팔로우 대기 여부

  public bltbCnt = 0 // 게시글 수 - Not in DB
  public bltbVoteCnt = 0 // 보팅 수 - Not in DB
  public bltbLikeCnt = 0 // 좋아요 수 - Not in DB
  public qestCnt = 0 // 퀘스트 수 - Not in DB

  public hispCtgrMgmtNmbr!: string // 하이스페이스 카테고리 관리 번호
  public hispCtgr?: HISP_CTGR // 하이스페이스 카테고리
  public ctgrName!: string // 카테고리 이름
  public ctgrMesgCode!: string // 카테고리 메세지 코드

  public logoFileMgmtNmbr!: string // 로고 파일 관리 번호
  public logoFile!: ATCM // 로고 파일 - Not in DB
  public logoFilePath!: string // 로고 경로 - Not in DB

  public thnlMgmtNmbr!: string // 배경이미지 관리 번호
  public thnl!: ATCM // 배경이미지 파일 - Not in DB
  public thnlPath!: string // 배경이미지 경로 - Not in DB

  public postMgmtNmbr!: string // 대표 게시물 관리번호 - Not in DB

  public hispMngYn!: string // 스페이스 운영여부 (마이페이지 스페이스 목록)

  // 스페이스 홈
  public todayVstrCnt!: number // 오늘 방문자 수
  public newBltbCnt!: number // 새 게시글 수

  public blockHispMgmtNmbr!: string // 차단 스페이스 관리번호
  public blockYn!: string // 차단 스페이스 관리번호

  public mngrWrite!: boolean // 피드 올리기 [true: 혼자 | false: 같이]

  constructor() {
    super()
  }
}
