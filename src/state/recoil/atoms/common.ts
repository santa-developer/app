import { atom } from 'recoil'

export const tabNavState = atom({
  key: 'tabNav',
  default: 'HomeMain',
})

export const isServerAccessibleState = atom({
  key: 'isServerAccessibleState',
  default: true,
})

export const pushIDState = atom({
  key: 'pushID',
  default: 0,
})

export const isLoadingShowState = atom({
  key: 'isLoadingShow',
  default: false,
})

export const shareClickedState = atom({
  key: 'shareClicked',
  default: false,
})

// 생체인증 사용여부
export const useBioMetricsState = atom({
  key: 'useBioMetrics',
  default: false,
})

// 읽지 않은 알림 툴팁 출력 여부
export const showPushTooltipState = atom({
  key: 'showPushTooltip',
  default: false,
})

export const fontScaleState = atom({
  key: 'fontScale',
  default: 1.0,
})

// 읽지 않은 알림 및 다이렉트 메시지 빨간 점 출력 여부
export const showRedPointState = atom({
  key: 'showRedPoint',
  default: {
    pushHistory: false,
    directMessage: false,
  },
})

export const isWiFiEnabledState = atom({
  key: 'isWiFiEnabled',
  default: true,
})

export const userAgentState = atom({
  key: 'userAgent',
  default: '',
})

export const beforeNaviNameState = atom({
  key: 'beforeNaviName',
  default: '',
})

export const currentRouteNameState = atom({
  key: 'currentRouteName',
  default: '',
})

export const codePushLabelState = atom({
  key: 'codePushLabel',
  default: '',
})

export const networkFailMsgState = atom({
  key: 'networkFailMsg',
  default: 'Network request failed',
})

export const decCommnetState = atom({
  key: 'decCommnet',
  default: '',
})

export const decItemState = atom({
  key: 'decItem',
  default: '',
})

export const decDateState = atom({
  key: 'decDate',
  default: '',
})

export const isPlayableState = atom({
  key: 'isPlayable',
  default: false,
})
