import React from 'react'
import HrScreen from './HrScreen'
import { HrProps } from './HrModel'

export default function Hr(props: HrProps): JSX.Element {
  return <HrScreen {...props} />
}
