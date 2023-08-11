import { ToastProps, initToastData } from '@models/TOAST'
import { atom } from 'recoil'

export const toastDataState = atom<ToastProps>({
  key: 'toastData',
  default: initToastData,
})
