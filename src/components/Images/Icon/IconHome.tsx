import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export default function IconHome(props: SvgProps): JSX.Element {
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
        d="M15.386 20H4.614C2.065 20 0 17.923 0 15.372v-6.9c0-1.267.781-2.86 1.786-3.642L6.8.919c1.507-1.174 3.916-1.23 5.48-.13l5.748 4.032C19.135 5.594 20 7.25 20 8.6v6.78A4.622 4.622 0 0115.386 20zM7.656 2.018l-5.014 3.91c-.66.522-1.247 1.705-1.247 2.543v6.9a3.23 3.23 0 003.219 3.232h10.772a3.221 3.221 0 003.219-3.222v-6.78c0-.894-.642-2.132-1.377-2.635l-5.749-4.032c-1.06-.745-2.81-.708-3.823.084z"
      ></Path>
      <Path
        fill={props.fill || '#C2C2C2'}
        d="M10 16.275a.703.703 0 01-.698-.698v-2.794c0-.382.317-.698.698-.698.381 0 .698.316.698.698v2.794a.703.703 0 01-.698.698z"
      ></Path>
    </Svg>
  )
}
