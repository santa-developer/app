import EX_CREATOR_MODIFIER from '@models/EX_CREATOR_MODIFIER'
import HISP_MGMT from './HISP_MGMT'
import ATCM from './ATCM'

// 하이스페이스/퀘스트 배너
export default class MAIN_CONTS_MGMT extends EX_CREATOR_MODIFIER {
  public linkUrl!: string // 링크 URL
  public expsSttDate!: string // 노출 시작 일자
  public expsEndDate!: string // 노출 종료 일자
  public opYn = false // 공개 여부
  public nwdwYn = false // 새창 여부
  public topBnerDvsnCode!: string // 배너 구분 코드
  public topBnerEpln!: string // 배너 설명
  public expsOrdr = 0 // 노출 순서
  public linkUseYn = false // 링크 사용 여부
  public expsYn = false // 노출 여부

  public rprsimgFileNmbr!: string // 대표이미지 파일 번호
  public rprsimgFile!: ATCM // 대표이미지 - Not in DB
  public rprsimgFilePath!: string // 대표이미지 경로 - Not in DB

  public thnlFileNmbr!: string // 미리보기이미지 파일 번호
  public thnlFile!: ATCM // 미리보기이미지 - Not in DB
  public thnlFilePath!: string // 미리보기이미지 경로 - Not in DB

  public hispMgmtNmbr!: string // 하이스페이스 관리번호
  public hisp?: HISP_MGMT // 하이스페이스 - Not in DB

  public hispName!: string // 하이스페이스 명 - Not in DB
  public flwgCnt = 0 // 팔로우 수 - Not in DB
  public vstrCnt = 0 // 방문자 수 - Not in DB

  public bnerCottYn!: string
  public bnerSbjtYn!: string
  public topBnerCott!: string // 배너 내용

  constructor(
    public topBnerMgmtNmbr: string, // 배너 관리 번호
    public topBnerSbjt: string // 배너 제목
  ) {
    super()
  }
}
