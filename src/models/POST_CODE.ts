export interface POST_CODE {
  reciAddress1?: number | string // 받는분 주소1 (우편번호)
  reciAddress2?: string // 받는분 주소2
  reciAddress3?: string // 받는분 주소3
  reciAddress4?: string // 받는분 주소4
}

export interface POST_DATA {
  zonecode: number
  userSelectedType: string
  roadAddress: string
  buildingName: string
  bname: string
  apartment: string
  jibunAddress: string
}
