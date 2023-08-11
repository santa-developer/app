import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export default function IconSquare(props: SvgProps): JSX.Element {
  return (
    <Svg width={20} height={18} fill="none" {...props}>
      <Path
        clipRule="evenodd"
        d="M15.348 14.875H4.652a1.527 1.527 0 01-1.527-1.527V2.652c0-.844.684-1.527 1.527-1.527h10.695c.844 0 1.527.684 1.527 1.527v10.695a1.526 1.526 0 01-1.526 1.528z"
        stroke="#9BA2BA"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
