import BLTB from '@models/Common/BLTB'
import { ViewProps } from 'react-native'

export interface CardProps extends ViewProps {
  item?: BLTB
  isCollapse?: boolean
  imageCnt?: number
}
