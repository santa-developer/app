import { AlertProps } from '@models/ALERT'
import { ToastProps } from '@models/TOAST'
import { toastDataState } from '@recoil/atoms/toast'
import {
  alertSelector,
  confirmSelector,
} from '@recoil/selectors/alert'
import { useSetRecoilState } from 'recoil'

export const useAlert = (): ((props: AlertProps) => void) => {
  const setAlert = useSetRecoilState(alertSelector)

  const alert = (props: AlertProps): void => {
    setAlert(props)
  }

  return alert
}

export const useConfirm = (): ((props: AlertProps) => void) => {
  const setConfirm = useSetRecoilState(confirmSelector)

  const confirm = (props: AlertProps): void => {
    setConfirm(props)
  }

  return confirm
}

export const useToast = (): ((props: ToastProps) => void) => {
  const setToast = useSetRecoilState(toastDataState)

  const toast = (props: ToastProps): void => {
    setToast(props)
  }

  return toast
}
