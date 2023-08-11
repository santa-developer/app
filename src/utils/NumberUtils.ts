import _ from 'lodash'

// 3자리 수마다 콤마 처리
export const setComma = (str: string | number): string => {
  const parts = _.toString(str).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

// 1000 => 1k, 1000000 => 1m
export const getCutNumber = (value: number | string): string => {
  const toNumber = _.toNumber(value)

  if (toNumber >= 1000000) {
    return (toNumber / 1000000).toFixed(1) + 'm'
  } else if (toNumber >= 1000) {
    return (toNumber / 1000).toFixed(1) + 'k'
  } else {
    return `${toNumber}`
  }
}

// 1000 => 1k, 1000000 => 1m
export const nFormatter = (num: number, digits = 1): string => {
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  let i
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }
  return (
    (num / si[i].value).toFixed(digits).replace(rx, '$1') +
    si[i].symbol
  )
}
