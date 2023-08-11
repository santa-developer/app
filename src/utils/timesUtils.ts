/**
 * 시간 관련 유틸
 */

import moment from 'moment'

/**
 * 몇분전, 몇시간전 등
 * @param ago
 * @returns
 */
const getViewDateFromNow = (ago?: number | string): string => {
  if (ago && `${ago}`.length >= 13) {
    return moment.unix(Number(ago) / 1000).fromNow()
  }
  return ''
}

export { getViewDateFromNow }
