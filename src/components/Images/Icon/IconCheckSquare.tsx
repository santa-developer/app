import * as React from 'react'
import Svg, {
  ClipPath,
  Defs,
  G,
  Path,
  SvgProps,
} from 'react-native-svg'

function SvgComponent(props: SvgProps): JSX.Element {
  return (
    <Svg width={15} height={15} fill="none" {...props}>
      <G clipPath="url(#a)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M.327 1.638C0 2.28 0 3.12 0 4.8v5.4c0 1.68 0 2.52.327 3.162a3 3 0 001.311 1.31C2.28 15 3.12 15 4.8 15h5.4c1.68 0 2.52 0 3.162-.327a3 3 0 001.311-1.311C15 12.72 15 11.88 15 10.2V4.8c0-1.68 0-2.52-.327-3.162A3 3 0 0013.362.327C12.72 0 11.88 0 10.2 0H4.8C3.12 0 2.28 0 1.638.327a3 3 0 00-1.311 1.31zm10.72 3.457a.75.75 0 00-1.061 0l-3.97 3.97-1.36-1.361a.75.75 0 00-1.061 1.06l1.89 1.892a.75.75 0 001.061 0l4.5-4.5a.75.75 0 000-1.061z"
          fill="#5D5FEF"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h15v15H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
