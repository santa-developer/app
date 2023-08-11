import { AlertProps, initAlertProps } from '@models/ALERT'
import { atom } from 'recoil'

export const isVisibleState = atom({
  key: 'isVisible', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

export const isConfirmState = atom({
  key: 'isConfirm',
  default: false,
})

export const isCopyURLVisibleState = atom({
  key: 'isCopyURLVisible',
  default: false,
})

export const alertPropsState = atom<AlertProps>({
  key: 'alertProps',
  default: initAlertProps,
})
