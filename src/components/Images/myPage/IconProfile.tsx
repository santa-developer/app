import * as React from 'react'
import {
  Circle,
  G,
  Mask,
  Path,
  Svg,
  SvgProps,
} from 'react-native-svg'

const SvgComponent = (props: SvgProps): JSX.Element => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 80 80"
    fill="none"
  >
    <Circle cx="40" cy="40" r="40" fill="#D9CBF3" />
    <Mask
      id="mask0_101_154013"
      maskUnits="userSpaceOnUse"
      x="5"
      y="0"
      width="70"
      height="70"
    >
      <Circle cx="40.0002" cy="34.7443" r="34.7443" fill="#F3F3F3" />
    </Mask>
    <G mask="url(#mask0_101_154013)">
      <Path
        d="M39.7376 13.4095C33.0555 13.4095 27.6342 18.8309 27.6342 25.513C27.6342 32.1951 33.0555 37.6164 39.7376 37.6164C46.4198 37.6164 51.8411 32.1951 51.8411 25.513C51.8411 18.8309 46.4198 13.4095 39.7376 13.4095ZM33.6859 41.6509C23.6312 41.6509 15.5308 49.7514 15.5308 59.8061V61.8233C15.5308 66.2991 19.124 69.8923 23.5997 69.8923H55.8756C60.3513 69.8923 63.9445 66.2991 63.9445 61.8233V59.8061C63.9445 49.7514 55.844 41.6509 45.7894 41.6509H33.6859Z"
        fill="white"
      />
    </G>
  </Svg>
)

export default SvgComponent
