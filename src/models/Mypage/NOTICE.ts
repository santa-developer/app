import EX_CREATOR_MODIFIER from '@models/EX_CREATOR_MODIFIER'

export interface NOTICE extends EX_CREATOR_MODIFIER {
  nteMgmtNmbr: string // 공지사항 관리번호
  impYn: string // 중요 여부
  langCode: string // 언어코드
  nteTitle: string // 공지사항 제목
  nteContents: string // 공지사항 본문
  userId?: string // 등록자 아이디
  mebrFileMgmtNmbr?: string // 등록자 프로필 사진관리번호
}
