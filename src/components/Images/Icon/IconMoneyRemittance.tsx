import React from 'react'
import {
  Circle,
  ClipPath,
  Defs,
  G,
  Path,
  Rect,
  Svg,
} from 'react-native-svg'

export default function IconMoneyRemittance(): JSX.Element {
  return (
    <Svg width="65" height="65" viewBox="0 0 65 65" fill="none">
      <Circle cx="32.5" cy="32.5" r="32.5" fill="#9877D5" />
      <G clipPath="url(#clip0_116_37090)">
        <Path
          d="M32 51.3939C42.711 51.3939 51.394 42.711 51.394 32C51.394 21.289 42.711 12.6061 32 12.6061C21.289 12.6061 12.6061 21.289 12.6061 32C12.6061 42.711 21.289 51.3939 32 51.3939Z"
          fill="#FFCC33"
        />
        <Path
          d="M32 47.5879C40.6089 47.5879 47.5879 40.6089 47.5879 32C47.5879 23.3911 40.6089 16.4121 32 16.4121C23.391 16.4121 16.4121 23.3911 16.4121 32C16.4121 40.6089 23.391 47.5879 32 47.5879Z"
          fill="#EDB529"
        />
        <Rect
          x="22.9095"
          y="22.1924"
          width="4.57995"
          height="19.8465"
          rx="2.28998"
          fill="#FFCC33"
        />
        <Rect
          x="29.7097"
          y="25.5222"
          width="4.57995"
          height="13.0459"
          rx="2.28998"
          fill="#FFCC33"
        />
        <Rect
          x="36.511"
          y="28.9926"
          width="4.57995"
          height="13.0459"
          rx="2.28998"
          fill="#FFCC33"
        />
        <Rect
          x="36.511"
          y="22.1924"
          width="4.57995"
          height="4.57995"
          rx="2.28998"
          fill="#FFCC33"
        />
        <G clipPath="url(#clip1_116_37090)">
          <Circle cx="44.5" cy="44.5" r="7.5" fill="white" />
          <Path
            d="M44.5 52C48.6447 52 52 48.6447 52 44.5C52 40.3553 48.6447 37 44.5 37C40.3553 37 37 40.3553 37 44.5C37 48.6447 40.3553 52 44.5 52ZM40.9079 44.1921C41.1368 43.9632 41.5158 43.9632 41.7447 44.1921L43.5921 46.0395L47.0342 41.6895C47.2395 41.4368 47.6105 41.3895 47.8632 41.5947C48.1158 41.8 48.1632 42.1711 47.9579 42.4237L44.1053 47.3026C44.0026 47.4368 43.8447 47.5158 43.6789 47.5237C43.6711 47.5237 43.6553 47.5237 43.6474 47.5237C43.4895 47.5237 43.3395 47.4605 43.2289 47.35L40.9079 45.0289C40.6711 44.8 40.6711 44.4289 40.9079 44.1921Z"
            fill="#2D4356"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_116_37090">
          <Rect
            width="40"
            height="40"
            fill="white"
            transform="translate(12 12)"
          />
        </ClipPath>
        <ClipPath id="clip1_116_37090">
          <Rect
            width="15"
            height="15"
            fill="white"
            transform="translate(37 37)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}