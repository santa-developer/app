import { BiometryType } from 'react-native-biometrics'

export interface BioConfirmProps {
  onPressCancel?: () => void
  onPressConfirm?: (props: {
    success: boolean
    error?: string
  }) => void
}

export interface IsSensorAvailableResult {
  available: boolean
  biometryType?: BiometryType
  error?: string
}
