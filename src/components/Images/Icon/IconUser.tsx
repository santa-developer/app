import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export default function IconUser(props: SvgProps): JSX.Element {
  return (
    <Svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <Path
        stroke={props.stroke || '#C2C2C2'}
        strokeWidth="1.5"
        d="M5.829 12.416H14.17a5.05 5.05 0 015.079 5.079V17.513c.004.23-.038.457-.124.67l.696.28-.696-.28a1.706 1.706 0 01-1.612 1.067h0H2.5v0h-.014a1.703 1.703 0 01-1.612-1.067l-.696.28.696-.28a1.705 1.705 0 01-.124-.67v-.019a5.047 5.047 0 015.079-5.078zm6.532-3.882a4.25 4.25 0 01-2.36.716 4.265 4.265 0 01-4.25-4.251 4.25 4.25 0 116.61 3.535z"
      ></Path>
    </Svg>
  )
}
