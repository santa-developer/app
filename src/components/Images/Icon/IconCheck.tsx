import { Text, View } from 'react-native'
import React from 'react'
import { SvgXml } from 'react-native-svg'

export default function IconCheck(): JSX.Element {
  const xml = `<svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="36.7087" cy="36.7085" r="36.7087" fill="#9877D5"/>
    <path d="M24.9999 36.1306L33.7189 45.9999L48.9999 28.9999" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `
  return <SvgXml xml={xml} />
}
