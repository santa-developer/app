import React from 'react'
import BootomModalScreen from './BottomModalScreen'
import { BottomModalModel } from './BottomModalModel'

export default function BottomModal(
  props: BottomModalModel
): JSX.Element {
  return <BootomModalScreen props={props} />
}
