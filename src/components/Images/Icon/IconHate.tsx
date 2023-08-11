import { Colors } from '@constants'
import { SvgStyleProps } from '@models/Common/SVG_STYLE'
import React from 'react'
import { SvgXml } from 'react-native-svg'

export default function IconHate(props: SvgStyleProps): JSX.Element {
  return (
    <SvgXml
      xml={`<svg width="${props.width || 18}" height="${
        props.height || 18
      }" viewBox="0 0 18 18" fill="${
        props.fill ? props.fill?.toString() : 'none'
      }" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="${
        props.svgColor || Colors.disabled
      }" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 12C12 12 10.875 10.5 9 10.5C7.125 10.5 6 12 6 12" stroke="#C2C2C2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.75 6.75H6.75833" stroke="#C2C2C2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.25 6.75H11.2583" stroke="#C2C2C2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      
    `}
    />
  )
}
