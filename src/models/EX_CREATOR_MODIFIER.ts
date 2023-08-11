import MEBR from './MEBR'

export default class EX_CREATOR_MODIFIER {
  public reguserid?: string // 등록자 id
  public reguser?: MEBR // 등록자 - Not in DB

  public regdatetime?: number // 등록일시

  public moduserid?: string // 수정자 id
  public moduser?: MEBR // 수정자 - Not in DB

  public moddatetime?: number // 수정일시
}
