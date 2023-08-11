import * as React from 'react'
import {
  Path,
  Svg,
  SvgProps,
  LinearGradient,
  Stop,
  Defs,
} from 'react-native-svg'

const SvgComponent = (props: SvgProps): JSX.Element => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 31 30"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M18.2498 10.875V5.83333H12.7498V10.875H10.9165V5.83333C10.9165 5.3471 11.1097 4.88079 11.4535 4.53697C11.7973 4.19315 12.2636 4 12.7498 4H18.2498C18.7361 4 19.2024 4.19315 19.5462 4.53697C19.89 4.88079 20.0832 5.3471 20.0832 5.83333V10.875H18.2498Z"
      fill="#AB6327"
    />
    <Path
      d="M7.25 8.58337V24.1667C7.25 25.1778 8.07225 26 9.08333 26H21.9167C22.9278 26 23.75 25.1778 23.75 24.1667V8.58337H7.25Z"
      fill="#BF6B29"
    />
    <Path
      d="M7.25 20.9584V24.1667C7.25 25.1778 8.07225 26 9.08333 26H21.9167C22.9278 26 23.75 25.1778 23.75 24.1667V20.9584H7.25Z"
      fill="#AB6327"
    />
    <Path
      opacity="0.1"
      d="M21.9167 25.7708H9.08333C8.07225 25.7708 7.25 24.9486 7.25 23.9375V24.1667C7.25 25.1778 8.07225 26 9.08333 26H21.9167C22.9278 26 23.75 25.1778 23.75 24.1667V23.9375C23.75 24.9486 22.9278 25.7708 21.9167 25.7708Z"
      fill="#222222"
    />
    <Path
      opacity="0.2"
      d="M7.25 8.58337H23.75V8.81254H7.25V8.58337Z"
      fill="white"
    />
    <Path
      d="M20.0833 8.58333V5.83333C20.0833 5.3471 19.8902 4.88079 19.5464 4.53697C19.2025 4.19315 18.7362 4 18.25 4H12.75C12.2638 4 11.7975 4.19315 11.4536 4.53697C11.1098 4.88079 10.9167 5.3471 10.9167 5.83333V8.58333H7.25V24.1667C7.25 25.1777 8.07225 26 9.08333 26H21.9167C22.9278 26 23.75 25.1777 23.75 24.1667V8.58333H20.0833ZM12.75 5.83333H18.25V8.58333H12.75V5.83333Z"
      fill="url(#paint0_linear_101_207090)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_101_207090"
        x1="5.93825"
        y1="11.3957"
        x2="25.6154"
        y2="20.5715"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="white" stopOpacity="0.2" />
        <Stop offset="1" stopColor="white" stopOpacity="0" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default SvgComponent
