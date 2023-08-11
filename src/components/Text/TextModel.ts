import { TextProps } from 'react-native'

export type Bold =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '250'
  | '300'
  | '350'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900' // '300' | '400' | '500' | '700' | '600' | '800'

export interface StyledTextProps extends TextProps {
  children?: React.ReactNode
  bold?: Bold
  size?: number
  color?: string
  value?: string
  lineHeight?: number
  letterSpacing?: number // letterSpacing
}
