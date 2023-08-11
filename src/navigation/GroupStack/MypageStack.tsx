import MypageSetting from '@screens/Common/Mypage/MypageMoreOption/Setting'
import Faq from '@screens/Common/Mypage/MypageMoreOption/Setting/Faq'
import MailInquiries from '@screens/Common/Mypage/MypageMoreOption/Setting/MailInquiries'
import Notice from '@screens/Common/Mypage/MypageMoreOption/Setting/Notice'
import NoticeDetail from '@screens/Common/Mypage/MypageMoreOption/Setting/Notice/Detail/NoticeDetailScreen'
import NotificationSetting from '@screens/Common/Mypage/MypageMoreOption/Setting/NotificationSetting'
import SettingSaveData from '@screens/Common/Mypage/MypageMoreOption/Setting/SaveData'
import Verfication from '@screens/Common/Mypage/MypageMoreOption/Setting/Verfication'
import ResetAuthentication from '@screens/Common/Mypage/MypageMoreOption/Setting/Verfication/ResetAuthentication'
import ResetAuthenticationInput from '@screens/Common/Mypage/MypageMoreOption/Setting/Verfication/ResetAuthentication/ResetAuthenticationInputScreen'
import ResetAuthenticationSms from '@screens/Common/Mypage/MypageMoreOption/Setting/Verfication/ResetAuthentication/ResetAuthenticationSmsScreen'

import Declaration from '@screens/Common/Mypage/MypageMoreOption/Declaration'
import CheckPswdScreen from '@screens/Common/Mypage/MypageMoreOption/EditInfo/CheckPswdScreen'
import EditEmailScreen from '@screens/Common/Mypage/MypageMoreOption/EditInfo/EditEmailScreen'
import EditMenuScreen from '@screens/Common/Mypage/MypageMoreOption/EditInfo/EditMenuScreen'
import EditPhoneNumForeign from '@screens/Common/Mypage/MypageMoreOption/EditInfo/EditPhoneNumForeign'
import EditPhoneCountry from '@screens/Common/Mypage/MypageMoreOption/EditInfo/EditPhoneCountry'
import EditPhonePass from '@screens/Common/Mypage/MypageMoreOption/EditInfo/EditPhonePass'
import EditProfileScreen from '@screens/Common/Mypage/MypageMoreOption/EditInfo/EditProfileScreen'
import EditPswdScreen from '@screens/Common/Mypage/MypageMoreOption/EditInfo/EditPswdScreen'
import MyPointScreen from '@screens/Common/Mypage/MypageMoreOption/MyPoint/MyPointScreen'
import RankingScreen from '@screens/Common/Mypage/MypageMoreOption/Ranking/RankingScreen'
import RewardHistoryScreen from '@screens/Common/Mypage/MypageMoreOption/RewardHistory/RewardHistoryScreen'

import MypageAllSpace from '@screens/Space/SpaceMypage/SpaceMypageAll'

import MypageFollow from '@screens/HABL/Mypage/MypageFollow'

// Bottom NavBar가 없는 페이지
export const mypageGroup = {
  /** Setting page */
  MypageSetting,
  MailInquiries,
  Notice,
  NoticeDetail,
  Faq,
  Verfication,
  ResetAuthentication,
  ResetAuthenticationSms,
  ResetAuthenticationInput,
  NotificationSetting,
  SettingSaveData,

  Declaration,
  EditMenuScreen,
  EditProfileScreen,
  EditPhoneNumForeign,
  EditPhoneCountry,
  EditPhonePass,
  CheckPswdScreen,
  EditPswdScreen,
  EditEmailScreen,
  MyPointScreen,
  RankingScreen,
  RewardHistoryScreen,

  /** MypageSpace */
  MypageAllSpace,

  /** Follow */
  MypageFollow,
}
