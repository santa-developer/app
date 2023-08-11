import { Colors } from '@constants'
import * as React from 'react'
import { SvgXml } from 'react-native-svg'
import { SvgStyleProps } from '@models/Common/SVG_STYLE'

export default function IconClear(props: SvgStyleProps): JSX.Element {
  return (
    <SvgXml
      xml={`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="${
        props.svgColor || Colors.nagative
      }" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 6V9" stroke="${
        props.svgColor || Colors.nagative
      }" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 12H9.0075" stroke="${
        props.svgColor || Colors.nagative
      }" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`}
      {...props}
    />
  )
}
