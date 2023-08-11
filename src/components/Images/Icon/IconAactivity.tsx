import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export default function IconAactivity(props: SvgProps): JSX.Element {
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
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13 19.25H7c-2.426 0-3.93-.49-4.845-1.405C1.24 16.929.75 15.426.75 13V7c0-2.426.49-3.929 1.405-4.844C3.071 1.24 4.574.75 7 .75h6c2.426 0 3.93.49 4.845 1.406C18.76 3.07 19.25 4.574 19.25 7v6c0 2.426-.49 3.93-1.405 4.845-.916.915-2.419 1.405-4.845 1.405z"
      ></Path>
      <Path
        stroke={props.stroke || '#C2C2C2'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5.33 12.49L7.71 9.4c.34-.44.97-.52 1.41-.18l1.83 1.44c.44.34 1.07.26 1.41-.17l2.31-2.98"
      ></Path>
    </Svg>
  )
}
