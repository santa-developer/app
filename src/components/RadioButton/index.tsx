import React from 'react'
import RadioButtonScreen from './RadioButtonScreen'
import { RadioButtonProps } from './RadioButtonModel'

export default function RadioButton(
  prpos: RadioButtonProps
): JSX.Element {
  return <RadioButtonScreen {...prpos} />
}
