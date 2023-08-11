import { Colors } from '@constants'
import { SvgStyleProps } from '@models/Common/SVG_STYLE'
import React from 'react'
import { SvgXml } from 'react-native-svg'

export default function IconChevron(
  props: SvgStyleProps
): JSX.Element {
  return (
    <SvgXml
      xml={`<svg width="15" height="15"  viewBox="0 0 15 15"  fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.75 5.625L7.5 9.375L11.25 5.625" stroke="${
      props.svgColor || Colors.bl
    }" stroke-linecap="round" stroke-linejoin="round" transform="rotate(${
        props.rotate || '0'
      } 7.5 7.5)"/>
    </svg>
    `}
    />
  )
}
