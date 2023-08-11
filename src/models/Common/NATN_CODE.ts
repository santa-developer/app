// 국가 코드
import EX_CREATOR_MODIFIER from '@models/EX_CREATOR_MODIFIER'

export class NATN_CODE extends EX_CREATOR_MODIFIER {
  public smsCode!: string //	국가 번호
  public msgCode!: string //	메세지 코드
  public uniCode!: string //	유니코드
  public useYn = false //	사용여부
  public natnOrdr = 0 //	정렬 순서

  constructor(
    public natnCode: string, //	국가 코드
    public codeName: string //	국가 명
  ) {
    super()
  }
}

export const defaultCountry = new NATN_CODE('KR', '대한민국')
defaultCountry.uniCode = '🇰🇷'
defaultCountry.msgCode = 'NATN_WORD_KR'
