import React from 'react'
import SelectBoxScreen from './SelectBoxScreen'
import { SelectBoxProps } from './SelectBoxModel'

export function SelectBox(props: SelectBoxProps): React.JSX.Element {
  return <SelectBoxScreen {...props} />
}
