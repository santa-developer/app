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

export default function IconMoneyPlus(): JSX.Element {
  return (
    <Svg width="65" height="65" viewBox="0 0 65 65" fill="none">
      <Circle cx="32.5" cy="32.5" r="32.5" fill="#0077FF" />
      <G clip-path="url(#clip0_116_36686)">
        <Path
          d="M31.9999 51.394C42.7109 51.394 51.3938 42.711 51.3938 32C51.3938 21.289 42.7109 12.6061 31.9999 12.6061C21.2889 12.6061 12.606 21.289 12.606 32C12.606 42.711 21.2889 51.394 31.9999 51.394Z"
          fill="#FFCC33"
        />
        <Path
          d="M32 47.5879C40.6089 47.5879 47.5879 40.6089 47.5879 32C47.5879 23.391 40.6089 16.4121 32 16.4121C23.391 16.4121 16.4121 23.391 16.4121 32C16.4121 40.6089 23.391 47.5879 32 47.5879Z"
          fill="#EDB529"
        />
        <Rect
          x="22.9094"
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
        <G clipPath="url(#clip1_116_36686)">
          <Circle cx="44.5" cy="44.5" r="7.5" fill="white" />
          <Path
            d="M44.5 37C40.3574 37 37 40.3574 37 44.5C37 48.6426 40.3574 52 44.5 52C48.6426 52 52 48.6426 52 44.5C52 40.3574 48.6426 37 44.5 37ZM48.3777 45.834H45.8309V48.3777C45.8309 49.1149 45.234 49.7117 44.4968 49.7117C43.7596 49.7117 43.1628 49.1149 43.1628 48.3777V45.834H40.6191C39.8819 45.834 39.2851 45.2372 39.2851 44.5C39.2851 43.7628 39.8819 43.166 40.6191 43.166H43.1628V40.6191C43.1628 39.8819 43.7596 39.2851 44.4968 39.2851C45.234 39.2851 45.8309 39.8819 45.8309 40.6191V43.166H48.3777C49.1149 43.166 49.7117 43.7628 49.7117 44.5C49.7117 45.2372 49.1149 45.834 48.3777 45.834Z"
            fill="#2D4356"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_116_36686">
          <Rect
            width="40"
            height="40"
            fill="white"
            transform="translate(12 12)"
          />
        </ClipPath>
        <ClipPath id="clip1_116_36686">
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