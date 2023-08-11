import { SvgProps } from 'react-native-svg'

export interface SvgStyleProps extends SvgProps {
  svgColor?: string | string[] | boolean
  svgSize?: number | number[]
  rotate?: string | number
}
