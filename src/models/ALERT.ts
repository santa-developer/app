export interface AlertProps {
  title?: string
  desc: string
  onPressConfirm?: () => void
  onPressCancel?: () => void
  onConfirmBtnText?: string
  onCancelBtnText?: string
  showVotingRemainTime?: boolean
  disableBackdropClose?: boolean
  fontSize?: number | string
}

export const initAlertProps: AlertProps = {
  title: '',
  desc: '',
  onPressConfirm: () => null,
  onPressCancel: () => null,
  onConfirmBtnText: '',
  onCancelBtnText: '',
  showVotingRemainTime: false,
  disableBackdropClose: false,
  fontSize: '13px',
}
