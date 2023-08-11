import React from 'react'
import TextScreen from './TextScreen'
import { StyledTextProps } from './TextModel'

export default function Text(props: StyledTextProps): JSX.Element {
  return <TextScreen props={props} />
}
