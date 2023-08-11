import React from 'react'
import { CountrySelectProps } from './CountrySelectModel'
import CountrySelectScreen from './CountrySelectScreen'

export function CountrySelect(
  props: CountrySelectProps
): React.JSX.Element {
  return <CountrySelectScreen {...props} />
}
