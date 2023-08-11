import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const SVGComponent = (props: SvgProps): JSX.Element => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <Path
      d="M19.3114 3.86462V9.05906H14.1169"
      stroke="#222222"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.1383 13.3872C16.5756 14.9801 15.5103 16.3469 14.1032 17.2817C12.696 18.2165 11.0231 18.6687 9.33662 18.57C7.65013 18.4714 6.04139 17.8272 4.75282 16.7347C3.46425 15.6422 2.56567 14.1605 2.19249 12.5129C1.8193 10.8652 1.99173 9.14091 2.68379 7.59979C3.37585 6.05867 4.55005 4.78422 6.02944 3.9685C7.50883 3.15278 9.21326 2.83998 10.8859 3.07723C12.5585 3.31448 14.1087 4.08893 15.3029 5.28387L19.3113 9.0585"
      stroke="#222222"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
export default SVGComponent
