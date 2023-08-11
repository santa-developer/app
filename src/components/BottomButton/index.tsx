import React from 'react'
import { BottomButtonVariousScreen } from './BottomButtonVariousScreen'
import { BottomButtonOneScreen } from './BottomButtonOneScreen'
import { ButtonProps } from '@components/Button/ButtonModel'

/**
 * bottom 버튼 한개
 * @param props
 * @returns
 */
export function BottomButtonOne(props: ButtonProps): JSX.Element {
  return <BottomButtonOneScreen props={props} />
}

/**
 * bottom 버튼 여러개
 * @param props
 * @returns
 */
export function BottomButtonVarious(props: {
  item: ButtonProps[]
}): JSX.Element {
  return <BottomButtonVariousScreen props={props} />
}
