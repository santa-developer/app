import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const SVGComponent = (props: SvgProps): React.JSX.Element => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 5 9"
    fill="none"
    {...props}
  >
    <Path
      d="M0.625 8.25L4.375 4.5L0.625 0.75"
      stroke="#787878"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
export default SVGComponent
