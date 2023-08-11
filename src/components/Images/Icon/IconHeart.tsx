import { Colors } from '@constants'
import { SvgStyleProps } from '@models/Common/SVG_STYLE'
import React from 'react'
import { SvgXml } from 'react-native-svg'

export default function IconHeart(props: SvgStyleProps): JSX.Element {
  const xml = `
  <svg 
    width="${props.width || 18}" 
    height="${props.width || 18}" 
    viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
  >
  <path d="M15.6301 3.20887C15.247 2.82562 14.7922 2.5216 14.2916 2.31418C13.791 2.10676 13.2545 2 12.7126 2C12.1707 2 11.6342 2.10676 11.1336 2.31418C10.633 2.5216 10.1782 2.82562 9.79509 3.20887L9.00009 4.00387L8.20509 3.20887C7.43132 2.4351 6.38186 2.0004 5.28759 2.0004C4.19331 2.0004 3.14386 2.4351 2.37009 3.20887C1.59632 3.98264 1.16162 5.03209 1.16162 6.12637C1.16162 7.22064 1.59632 8.2701 2.37009 9.04387L3.16509 9.83887L9.00009 15.6739L14.8351 9.83887L15.6301 9.04387C16.0133 8.6608 16.3174 8.20598 16.5248 7.70539C16.7322 7.20479 16.839 6.66823 16.839 6.12637C16.839 5.5845 16.7322 5.04795 16.5248 4.54735C16.3174 4.04676 16.0133 3.59194 15.6301 3.20887Z" 
    fill="${props.svgColor || Colors.wh}" 
    stroke="${props.svgColor || Colors.disabled}" 
    stroke-linecap="round" 
    stroke-linejoin="round"/>
</svg>

  `

  return <SvgXml xml={xml} />
}
