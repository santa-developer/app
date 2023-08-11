import { Colors } from '@constants'
import * as React from 'react'
import { SvgXml } from 'react-native-svg'
import { SvgStyleProps } from '@models/Common/SVG_STYLE'

export default function IconXmark(props: SvgStyleProps): JSX.Element {
  return (
    <SvgXml
      xml={`
      <svg width="42" height="44" viewBox="0 0 42 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27 17L17 27" stroke="${
        props.svgColor || Colors.nagative
      }" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17 17L27 27" stroke="${
        props.svgColor || Colors.nagative
      }" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      
  `}
      {...props}
    />
  )
}
