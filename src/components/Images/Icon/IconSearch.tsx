import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export default function IconSearch(props: SvgProps): JSX.Element {
  return (
    <Svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <Path
        fill={props.fill || '#C2C2C2'}
        d="M9.536 19.07C4.279 19.07 0 14.79 0 9.535 0 4.279 4.28 0 9.536 0c5.256 0 9.536 4.28 9.536 9.535 0 5.256-4.28 9.535-9.536 9.535zm0-17.675c-4.494 0-8.14 3.656-8.14 8.14s3.646 8.14 8.14 8.14c4.493 0 8.14-3.656 8.14-8.14s-3.647-8.14-8.14-8.14zM19.305 20a.69.69 0 01-.494-.204l-1.86-1.86a.702.702 0 010-.987c.27-.27.716-.27.986 0l1.86 1.86c.27.27.27.717 0 .987a.69.69 0 01-.492.204z"
      ></Path>
    </Svg>
  )
}
