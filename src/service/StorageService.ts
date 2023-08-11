import AsyncStorage from '@react-native-async-storage/async-storage'

export const enum StorageKey {
  accessToken = 'accessToken', // string
  refreshToken = 'refreshToken', // string
  // TUTORIAL_COMPLETE = 'tutorialComplete', // string
  ASLocale = 'ASLocale', //  RNLocalize.getCountry()
  RECENT_SEARCH_KEYWORD = 'RecentSearchKeyword', // list
  RECENT_SPACE_SEARCH_KEYWORD = 'RecentSpaceSearchKeyword', // list
  PUSH_CONFIRM_YN = 'PUSH_CONFIRM_YN', // Y | N
  ALARM_CHECKED_LIST = 'alarmCheckedList', // list
  PLAY_ONLY_WIFI = 'PLAY_ONLY_WIFI', // Y | N
  PREV_APP_VER = 'PREV_VERSION', // string
  BIOMETRICS_LOGIN_RE_TOKEN = 'BIOMETRICS_LOGIN_RE_TOKEN', // 최근에 생체인증한 계정 refresh token
  RECENT_LOGIN_USER_ID = 'RECENT_LOGIN_USER_ID', // 최근에 로그인한 계정
  LAST_VIEW_DATE = 'LAST_VIEW_DATE',
}

function setItem(
  key: StorageKey | string,
  value: string
): Promise<void> {
  return AsyncStorage.setItem(key, value)
}

function getItem(key: StorageKey | string): Promise<string | null> {
  return AsyncStorage.getItem(key)
}

function removeItem(key: StorageKey | string): Promise<void> {
  return AsyncStorage.removeItem(key)
}

export default {
  setItem,
  getItem,
  removeItem,
}
