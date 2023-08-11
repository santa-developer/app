import { selector, DefaultValue } from 'recoil'
import {
  isConfirmState,
  isVisibleState,
  alertPropsState,
} from '../atoms/alert'
import { AlertProps } from '@models/ALERT'

export const alertSelector = selector<AlertProps>({
  key: 'alertSelector',
  get: ({ get }) => {
    const alertProps = get(alertPropsState)

    return {
      isVisible: true,
      isConfirm: false,
      ...alertProps,
    }
  },
  set: ({ set }, newValue) => {
    const { ...alertProps } = newValue

    set(isVisibleState, true)
    set(isConfirmState, false)
    set(alertPropsState, (prevProps) =>
      alertProps instanceof DefaultValue
        ? prevProps
        : { ...prevProps, ...alertProps }
    )
  },
})

export const confirmSelector = selector<AlertProps>({
  key: 'confirmSelector',
  get: ({ get }) => {
    const confirmProps = get(alertPropsState)

    return {
      isVisible: true,
      isConfirm: true,
      ...confirmProps,
    }
  },
  set: ({ set }, newValue) => {
    const { ...confirmProps } = newValue

    set(isVisibleState, true)
    set(isConfirmState, true)
    set(alertPropsState, (prevProps) =>
      confirmProps instanceof DefaultValue
        ? prevProps
        : { ...prevProps, ...confirmProps }
    )
  },
})
