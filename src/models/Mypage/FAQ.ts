import EX_CREATOR_MODIFIER from '@models/EX_CREATOR_MODIFIER'

export interface FAQ extends EX_CREATOR_MODIFIER {
  faqMgmtNmbr: string // 관리번호
  opYn: string // 공개 여부
  langCode: string // 언어코드
  faqDvsnCode: string // 구분코드
  codeName: string // 코드이름
  faqSbjt: string // 제목
  faqCott: string // 본문
  msgCode: string // 카테고리 다국어 메세지
}
