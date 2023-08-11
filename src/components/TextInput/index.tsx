import React from 'react'
import TextInputScreen from './TextInputScreen'
import { FormInputProps } from './TextInputModel'

export default function TextInput(
  props: FormInputProps
): JSX.Element {
  return <TextInputScreen props={props} />
}
