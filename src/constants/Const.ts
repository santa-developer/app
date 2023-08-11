import { Platform } from 'react-native'
import Config from 'react-native-config'

const IS_DEV = true
const BLOCK_VASP_REQUIRED = !IS_DEV // VASP 관련하여 기능 막을 시 true

const ENV = {
  sendbird: {
    appId: IS_DEV
      ? Config.SENDBIRD_APP_ID_DEV
      : Config.SENDBIRD_APP_ID_PROD,
    secondaryApiToken: IS_DEV
      ? Config.SENDBIRD_API_TOKEN_DEV
      : Config.SENDBIRD_API_TOKEN_PROD,
  },
  reCaptcha: {
    url: Config.RECAPTCHA_URL,
    v2: Config.RECAPTCHA_V2,
    v3: Config.RECAPTCHA_V3,
    ent: {
      url: Config.RECAPTCHA_ENT_URL,
      v3: Config.RECAPTCHA_ENT_V3,
    },
  },
  codePushKey: Platform.select({
    android: {
      store: Config.CODEPUSH_ANDROID_STORE,
      dev: Config.CODEPUSH_ANDROID_DEV,
      prod: Config.CODEPUSH_ANDROID_PROD,
    },
    ios: {
      store: Config.CODEPUSH_IOS_STORE,
      dev: Config.CODEPUSH_IOS_DEV,
      prod: Config.CODEPUSH_IOS_PROD,
    },
  }),
  h: JSON.parse(Config.H || ''),
}

const API_URL = IS_DEV ? Config.API_URL_DEV : Config.API_URL_PROD

const WALLET_API_URL = IS_DEV
  ? Config.WALLET_URL_DEV
  : Config.WALLET_URL_PROD

const IMAGE_URL = IS_DEV
  ? Config.IMAGE_URL_DEV
  : Config.IMAGE_URL_PROD

const APP_URL = Platform.select({
  ios: 'https://itunes.apple.com/app/id1478995676',
  default:
    'https://play.google.com/store/apps/details?id=io.hiblocks.app',
})

//https://regexr.com/
const SNS_REGEX =
  /(http(s)?:\/\/)(www.facebook.com|m.facebook.com|fbwat.ch|www.youtube.com|youtu.be|www.instagram.com|vt.tiktok.com|www.tiktok.com|www.linkedin.com|naver.me|blog.naver.com|m.blog.naver.com|m.post.naver.com|post.naver.com|t.tiktok.com)+/gi
const EC_REGEX =
  /(http(s)?:\/\/)((link|m|trip|www).?coupang.com\/.*(\/products|&itemId)|(m.)?(shopping|smartstore|brand|toptop).naver.com\/.*(products)|(view.)?(shoppinglive.naver.com\/(?!home|search|calendar|my)+\w))/gi

// 나이 제한
const USER_MINIMUM_AGE = 14

// 연락처, 이메일 인증
const CERTIFY_CONFIG = {
  TEXT_LENGTH: 6, // 인증번호 길이
  TIMER_SECOND: 600, // 인증 제한 시간 (초)
}

const HIBS_CHARGE_GUIDE =
  'https://blog.naver.com/teamhiblocks/222124295829'

export default {
  IS_DEV,
  ENV,
  BLOCK_VASP_REQUIRED,
  API_URL,
  IMAGE_URL,
  WALLET_API_URL,
  SNS_REGEX,
  EC_REGEX,
  APP_URL,
  USER_MINIMUM_AGE,
  HIBS_CHARGE_GUIDE,
  CERTIFY_CONFIG,
}
