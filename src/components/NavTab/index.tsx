import React from 'react'
import NavTabScreen from './NavTabScreen'
import { NavTabProps } from './NavTabModel'

export default function NavTab(props: NavTabProps): JSX.Element {
  return <NavTabScreen {...props} />
}
