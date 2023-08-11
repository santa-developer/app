import { I18n } from 'i18n-js'
import _ from 'lodash'
import { Platform, NativeModules } from 'react-native'
import RNFS from 'react-native-fs'

import * as RNLocalize from 'react-native-localize'
import Moment from 'moment'

import { FilePath } from '@service/FileService'
import StorageService, { StorageKey } from '@service/StorageService'

const i18n = new I18n()
export enum CountryCode {
  US = 'US',
  KR = 'KR',
  ID = 'ID',
}

export async function getLocale(): Promise<string> {
  let locale = await StorageService.getItem(StorageKey.ASLocale)
  if (locale === null) {
    locale = getSystemLocale()
  }
  return locale
}
export function getSystemLocale(): string {
  let locale = 'US'
  if (Platform.OS === 'ios') {
    const appleLocale =
      NativeModules.SettingsManager.settings.AppleLocale
    locale = _.startsWith(appleLocale, 'ko')
      ? CountryCode.KR
      : _.startsWith(appleLocale, 'id')
      ? CountryCode.ID
      : CountryCode.US
  } else {
    const defaultLocale = RNLocalize.getCountry()
    locale = _.startsWith(defaultLocale, 'KR')
      ? CountryCode.KR
      : _.startsWith(defaultLocale, 'ID')
      ? CountryCode.ID
      : CountryCode.US
  }
  return locale
}

export async function initI18n(
  locale?: CountryCode | string
): Promise<void> {
  try {
    const data = await RNFS.readFile(FilePath.localeMsg, 'utf8')
    if (data) {
      const jsonData = JSON.parse(data)
      if (jsonData) {
        i18n.translations = {
          en: jsonData.US,
          [CountryCode.US]: jsonData.US,
          [CountryCode.KR]: jsonData.KR,
          [CountryCode.ID]: jsonData.ID,
        }
      }
    }
  } catch (error) {}

  // const setLocale = locale || (await getLocale())
  const setLocale = locale || getSystemLocale()
  i18n.locale = setLocale
  StorageService.setItem(StorageKey.ASLocale, setLocale)
  initMoment(setLocale)
}

async function initMoment(
  locale: CountryCode | string
): Promise<void> {
  let momentConfig = {}
  if (locale === CountryCode.KR) {
    momentConfig = {
      months:
        '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split(
          '_'
        ),
      monthsShort:
        '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split(
          '_'
        ),
      weekdays:
        '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
      weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
      weekdaysMin: '일_월_화_수_목_금_토'.split('_'),
      longDateFormat: {
        LT: 'A h:mm',
        LTS: 'A h:mm:ss',
        L: 'YYYY.MM.DD.',
        LL: 'YYYY년 MMMM D일',
        LLL: 'YYYY년 MMMM D일 A h:mm',
        LLLL: 'YYYY년 MMMM D일 dddd A h:mm',
        l: 'YYYY.MM.DD.',
        ll: 'YYYY년 MMMM D일',
        lll: 'YYYY년 MMMM D일 A h:mm',
        llll: 'YYYY년 MMMM D일 dddd A h:mm',
      },
      calendar: {
        sameDay: '오늘 LT',
        nextDay: '내일 LT',
        nextWeek: 'dddd LT',
        lastDay: '어제 LT',
        lastWeek: '지난주 dddd LT',
        sameElse: 'L',
      },
      relativeTime: {
        future: '%s 후',
        past: '%s 전',
        s: '몇 초',
        ss: '%d초',
        m: '1분',
        mm: '%d분',
        h: '한 시간',
        hh: '%d시간',
        d: '하루',
        dd: '%d일',
        M: '한 달',
        MM: '%d개월',
        y: '일 년',
        yy: '%d년',
      },
      dayOfMonthOrdinalParse: /\d{1,2}(일|월|주)/,
      ordinal: function (number: string, period: string): string {
        switch (period) {
          case 'd':
          case 'D':
          case 'DDD':
            return number + '일'
          case 'M':
            return number + '월'
          case 'w':
          case 'W':
            return number + '주'
          default:
            return number
        }
      },
      meridiemParse: /오전|오후/,
      isPM: function (token: string): boolean {
        return token === '오후'
      },
      meridiem: function (hour: number): string {
        return hour < 12 ? '오전' : '오후'
      },
    }
  }
  Moment.locale(locale, momentConfig)
}

export function localeStringParser(
  theString: string,
  ...params: (string | number)[]
): string {
  let i = 0
  for (i; i < params.length; i++) {
    const regEx = new RegExp('\\{' + i + '\\}', 'gm')
    theString = theString.replace(regEx, _.toString(params[i]))
  }

  return theString
}

export default function $t(
  key: string,
  ...arg: (string | number)[]
): string {
  return localeStringParser(i18n.t(key), ...arg).replace(/\\n/g, '\n')
}
