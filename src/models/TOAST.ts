export interface ToastProps {
  title?: string
  desc: string
  type?: 'info' | 'success' | 'error'
}

export const initToastData: ToastProps = {
  title: '',
  desc: '',
  type: 'info',
}
