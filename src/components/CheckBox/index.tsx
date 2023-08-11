import React from 'react'
import CheckBoxScreen from './CheckBoxScreen'
import { CheckBoxProps } from './CheckBoxModel'

export default function CheckBox(props: CheckBoxProps): JSX.Element {
  return <CheckBoxScreen {...props} />
}
