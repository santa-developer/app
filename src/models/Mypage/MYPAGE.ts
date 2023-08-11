import { MyPageCntProps } from '@models/Common/MYPAGE_CNT'
import MEBR from '@models/MEBR'
// import { ImageProps } from '@models/Upload/PHOTO'
// import { SocialType } from '@models/Auth/USER_INFO'

export interface IMypage {
  mebrMgmtNmbr: string
  uniqueKey?: string
}
export interface IHAblMypageHeader {
  userId?: string
  isMypage: boolean
}

export interface MypageProps {
  userInfo?: MEBR
  cntInfo?: MyPageCntProps
}

export interface MyPageListProps {
  mebrMgmtNmbr?: string
  hispMgmtNmbr?: string
  currPage: number
  recordCountPerPage: number
}

// export interface UpdateMemberImgProps {
//   imageType: 'P' | 'B'
//   memberImg?: ImageProps
//   initType?: string | undefined
// }

export interface UpdateProfileProps {
  userId: string | undefined
  userInf: string | undefined // 사용자 소개
  userEmil: string | undefined
  webUrl: string | undefined
  birthDay: string | Date
  profileImg: string | undefined
  // bgImg: ImageProps
  // socialType: SocialType
  // extWltAdrs: string //외부지갑주소
}
