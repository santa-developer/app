import { ModalProps as DefaultModalProps } from 'react-native'

export interface BottomModalModel extends DefaultModalProps {
  isVisible: boolean
  onBackdropPress?: () => void
  isBackDrop?: boolean
  modalHeight?: number | string
  backgroundColor?: string
}
