import React from 'react'
import ButtonScreen from './ButtonScreen'
import { ButtonProps } from './ButtonModel'

export default function Button(props: ButtonProps): JSX.Element {
  return <ButtonScreen {...props} />
}
