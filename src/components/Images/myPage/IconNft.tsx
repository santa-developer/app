import * as React from 'react'
import { Path, Svg, SvgProps } from 'react-native-svg'
const SvgComponent = (props: SvgProps): JSX.Element => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 31 30"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M23.9544 4.6615H7.1057C6.03646 4.6615 5.16162 5.53633 5.16162 6.60558V23.4867C5.16162 24.5559 6.03646 25.4307 7.1057 25.4307H23.9868C25.056 25.4307 25.9309 24.5559 25.9309 23.4867V6.60558C25.8985 5.53633 25.0236 4.6615 23.9544 4.6615Z"
      fill="#EFF3F5"
    />
    <Path
      d="M23.9544 24.7827H7.1057C6.03646 24.7827 5.16162 23.9079 5.16162 22.8386V23.4542C5.16162 24.5235 6.03646 25.3983 7.1057 25.3983H23.9868C25.056 25.3983 25.9309 24.5235 25.9309 23.4542V22.8386C25.8985 23.9079 25.0236 24.7827 23.9544 24.7827Z"
      fill="#DFE3E5"
    />
    <Path
      d="M23.5333 7.48035H7.49463V20.6677H23.5333V7.48035Z"
      fill="#41B3E2"
    />
    <Path
      d="M20.0015 13.5071L16.7938 16.7148L12.614 12.535L7.49463 17.6544V20.6678H23.5657V17.0712L20.0015 13.5071Z"
      fill="#445C6C"
    />
    <Path
      d="M23.5333 19.9548H7.49463V20.6677H23.5333V19.9548Z"
      fill="#374D59"
    />
    <Path
      d="M16.6643 12.2434C17.4874 12.2434 18.1547 11.5761 18.1547 10.7529C18.1547 9.92975 17.4874 9.26245 16.6643 9.26245C15.8411 9.26245 15.1738 9.92975 15.1738 10.7529C15.1738 11.5761 15.8411 12.2434 16.6643 12.2434Z"
      fill="white"
    />
  </Svg>
)

export default SvgComponent
