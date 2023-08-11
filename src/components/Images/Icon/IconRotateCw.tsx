import { Colors } from '@constants'
import * as React from 'react'
import { SvgXml } from 'react-native-svg'
import { SvgStyleProps } from '@models/Common/SVG_STYLE'

export default function IconRotateCw(
  props: SvgStyleProps
): JSX.Element {
  return (
    <SvgXml
      xml={`
      <svg width="16" height="14" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.3114 1.86462V7.05906H13.1169" stroke="${
        props.svgColor || Colors.disabled
      }" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16.1383 11.3872C15.5756 12.9801 14.5103 14.3469 13.1032 15.2817C11.696 16.2165 10.0231 16.6687 8.33662 16.57C6.65013 16.4714 5.04139 15.8272 3.75282 14.7347C2.46425 13.6422 1.56567 12.1605 1.19249 10.5129C0.819303 8.86521 0.991733 7.14091 1.68379 5.59979C2.37585 4.05867 3.55005 2.78422 5.02944 1.9685C6.50883 1.15278 8.21326 0.839978 9.8859 1.07723C11.5585 1.31448 13.1087 2.08893 14.3029 3.28387L18.3113 7.0585" stroke="${
        props.svgColor || Colors.disabled
      }" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      
  `}
      {...props}
    />
  )
}
