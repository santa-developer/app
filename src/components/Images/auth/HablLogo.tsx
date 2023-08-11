import { Colors } from '@constants'
import * as React from 'react'
import { SvgProps, SvgXml } from 'react-native-svg'

export default function HABLLogo(props: SvgProps): JSX.Element {
  return (
    <SvgXml
      xml={`
  <svg width="180" height="44" viewBox="0 0 180 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_101_152533)">
      <path d="M60.2622 0.0702891L46.6756 44H64.32L66.0489 38.9525H76.0533L77.7822 44H95.4267L81.8356 0.0702891H60.2622ZM71.0622 28.2468H68.5822L71.0489 19.5311L73.52 28.2468H71.0622ZM27.3333 0.0702891H44.6667V44H27.3333V30.6014H17.3333V44H0V0.0702891H17.3333V13.4689H27.3333V0.0702891ZM180 26.8674V44H145.333V0.0702891H162.667V26.8674H180ZM134.973 21.3586C138.556 19.0743 140.347 16.03 140.347 12.2871C140.347 8.54433 139.013 5.55711 136.253 3.39577C133.502 1.11142 129.729 0 124.809 0H97.0533V44H124.809C129.924 44 134.08 42.8271 137.342 40.5471C140.604 38.2672 142.2 35.5172 142.2 32.4157C142.2 27.3243 139.778 23.6386 134.973 21.3586ZM114.32 11.1186H120.329C122.316 11.1186 123.338 11.9972 123.338 13.8071C123.338 15.617 122.316 16.4429 120.329 16.4429H114.32V11.1186ZM120.987 32.8814H114.32V27.5571H120.987C122.969 27.5571 123.996 28.4357 123.996 30.1929C123.996 31.9501 122.951 32.8814 120.969 32.8814H120.987Z" fill="url(#paint0_linear_101_152533)"/>
    </g>
    <defs>
      <linearGradient id="paint0_linear_101_152533" x1="0" y1="12.98" x2="180" y2="12.98" gradientUnits="userSpaceOnUse">
        <stop stop-color="${Colors.logo2}"/>
        <stop offset="1" stop-color="${Colors.logo1}"/>
      </linearGradient>
        <clipPath id="clip0_101_152533">
          <rect width="180" height="44" fill="white"/>
        </clipPath>
    </defs>
  </svg>
  `}
      {...props}
    />
  )
}
