import * as React from 'react'
import { Path, Svg, SvgProps } from 'react-native-svg'

const SvgComponent = (props: SvgProps): JSX.Element => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 30 30"
    fill="none"
  >
    <Path
      d="M22.95 5.06995H7.05049C5.40688 5.06995 4.06934 6.40749 4.06934 8.0511V17.9883C4.06934 19.6319 5.40688 20.9694 7.05049 20.9694H10.8942C11.241 20.9694 11.5669 21.1543 11.7458 21.4524L13.296 24.035C13.6577 24.6392 14.2957 24.9999 15.0002 24.9999C15.7048 24.9999 16.3417 24.6392 16.7045 24.036L18.2547 21.4524C18.4335 21.1543 18.7595 20.9694 19.1063 20.9694H22.95C24.5936 20.9694 25.9311 19.6319 25.9311 17.9883V8.0511C25.9311 6.40749 24.5936 5.06995 22.95 5.06995Z"
      fill="#E9ECF1"
    />
    <Path
      d="M15.0005 12.026H9.03815C8.7746 12.026 8.52185 11.9213 8.33549 11.735C8.14913 11.5486 8.04443 11.2958 8.04443 11.0323C8.04443 10.7687 8.14913 10.516 8.33549 10.3296C8.52185 10.1433 8.7746 10.0386 9.03815 10.0386H15.0005C15.264 10.0386 15.5168 10.1433 15.7031 10.3296C15.8895 10.516 15.9942 10.7687 15.9942 11.0323C15.9942 11.2958 15.8895 11.5486 15.7031 11.735C15.5168 11.9213 15.264 12.026 15.0005 12.026ZM15.0005 16.0009H9.03815C8.7746 16.0009 8.52185 15.8962 8.33549 15.7098C8.14913 15.5235 8.04443 15.2707 8.04443 15.0072C8.04443 14.7436 8.14913 14.4909 8.33549 14.3045C8.52185 14.1181 8.7746 14.0134 9.03815 14.0134H15.0005C15.264 14.0134 15.5168 14.1181 15.7031 14.3045C15.8895 14.4909 15.9942 14.7436 15.9942 15.0072C15.9942 15.2707 15.8895 15.5235 15.7031 15.7098C15.5168 15.8962 15.264 16.0009 15.0005 16.0009Z"
      fill="#63A0D5"
    />
  </Svg>
)

export default SvgComponent
