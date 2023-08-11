import EX_CREATOR_MODIFIER from '@models/EX_CREATOR_MODIFIER'

export default class HispKeyword extends EX_CREATOR_MODIFIER {
  hispKeywordMgmtNmbr!: string //키워드 관리번호
  keywordSbjt!: string // 키워드
  keywordEpln!: string // 키워드 소개
  useYn!: string // 사용 여부
}
