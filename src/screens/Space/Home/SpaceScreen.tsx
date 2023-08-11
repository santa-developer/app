import React from 'react'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'

import SpaceHome from './components/SpaceHome'
import HomeLeftHeader from '@components/Header/HomeHeader/HomeLeftHeader'
import HomeRightHeader from '@components/Header/HomeHeader/HomeRightHeader'

export default function SpaceScreen(): JSX.Element {
  return <SpaceHome />
}
SpaceScreen.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    headerLeft: HomeLeftHeader,
    headerRight: HomeRightHeader,
  })
}
