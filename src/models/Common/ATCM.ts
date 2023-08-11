import EX_CREATOR_MODIFIER from '@models/EX_CREATOR_MODIFIER'

// 첨부파일
export default class ATCM extends EX_CREATOR_MODIFIER {
  public postMgmtNmbr?: string //	게시판 관리번호

  //ATCM
  public displayUrl!: string //	이미지
  public isVideo: boolean | 'Y' | 'N' = 'N' //	비디오 여부
  public videoUrl?: string //	비디오 URL
  public urlType?: string //	URL_TYPE
  public snsOrdr?: number //	SNS_ORDR

  //ATCM_FILE
  public fileMgmtNmbr?: string = '' // 직접등록시 파일 관리번호 (ATCM_FILE)
  public fileType: 'IMAGE' | 'VIDEO' | 'C_IMG' | 'C_VOD' = 'IMAGE' //	비디오 여부 (DB) // felix added c_IMG & C_VOD for cloud storage type requested by JungJaeHyun

  public ratio?: number = 1 // 이미지 가로 - 세로 비 - Not in DB
}
