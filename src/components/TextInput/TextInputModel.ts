import { TextInputProps, ViewStyle, TextInput } from 'react-native'

export interface FormInputProps extends TextInputProps {
  inputRef?: React.RefObject<TextInput>
  iconInfo?: { iconName?: string; iconComp?: JSX.Element }
  editable?: boolean
  isRound?: boolean
  hintMessage?: string
  errorMessage?: string
  onClickClearBtn?: () => void
  containerStyle?: ViewStyle
  inputInnerText?: string
}
