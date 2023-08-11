import React from 'react'
import BodyScreen from './BodyScreen'
import { BodyProps } from './BodyModel'

export default function Body(props: BodyProps): JSX.Element {
  return <BodyScreen {...props} />
}
