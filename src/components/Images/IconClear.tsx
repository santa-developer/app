import { Colors } from '@constants'
import * as React from 'react'
import { SvgXml } from 'react-native-svg'
import { SvgStyleProps } from '@models/Common/SVG_STYLE'

export default function IconClear(props: SvgStyleProps): JSX.Element {
  return (
    <SvgXml
      xml={`
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_101_157133)">
      <path d="M8.17872 13.7147C11.3163 13.7147 13.8599 11.1563 13.8599 8.00042C13.8599 4.84451 11.3163 2.28613 8.17872 2.28613C5.0411 2.28613 2.49756 4.84451 2.49756 8.00042C2.49756 11.1563 5.0411 13.7147 8.17872 13.7147Z" fill="${
        props.svgColor || Colors.nagative
      }" stroke="${
        props.svgColor || Colors.nagative
      }" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9.88331 6.28613L6.47461 9.7147" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.47461 6.28613L9.88331 9.7147" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
      <clipPath id="clip0_101_157133">
      <rect width="13.6348" height="13.7143" fill="white" transform="translate(1.36133 1.14307)"/>
      </clipPath>
      </defs>
      </svg>
      
  `}
      {...props}
    />
  )
}
