import React from 'react'
import {
  View,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
} from 'react-native'
import LottieView from 'lottie-react-native'

import { Colors, Images, Layout } from '@constants'
import { LoadingProps } from './LoadingModel'
import { isLoadingShowState } from '@recoil/atoms/common'
import { useRecoilValue } from 'recoil'

export function LoadingPage(): JSX.Element {
  const isLoadingShow = useRecoilValue(isLoadingShowState)

  const styles = StyleSheet.create({
    wrap: {
      zIndex: 9999,
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'flex-start',
      paddingTop: (Layout.window.height - 80) / 2,
      alignItems: 'center',
      backgroundColor: '#00000020',
      marginTop: StatusBar.currentHeight,
    },
  })
  return (
    <>
      {isLoadingShow && (
        <View style={styles.wrap}>
          <LoadingMark />
        </View>
      )}
    </>
  )
}
export function LoadingMark(props: LoadingProps): JSX.Element {
  const { viewStyle, size, spinnerColor, spinnerStyle } = props
  return (
    <View style={viewStyle}>
      <ActivityIndicator
        size={size ? size : 'large'}
        color={spinnerColor || Colors.pu}
        style={spinnerStyle}
      />
    </View>
  )
}

export function LoadingIcon(props: LoadingProps): JSX.Element {
  const { viewStyle, darkTheme } = props

  const styles = StyleSheet.create({
    wrap: {
      width: 150,
      height: 150,
    },
  })

  return (
    <View style={viewStyle}>
      <LottieView
        style={styles.wrap}
        autoPlay
        loop
        source={
          darkTheme ? Images.lottie.loading2 : Images.lottie.loading
        }
      />
    </View>
  )
}

/**
 * 로딩 아이콘 전체 화면
 */
export function LoadingIconPage(props: LoadingProps): JSX.Element {
  const { isHeaderEmpty, darkTheme } = props

  const styles = StyleSheet.create({
    wrap: {
      justifyContent: 'center',
      alignItems: 'center',
      height:
        Layout.window.height +
        (!isHeaderEmpty ? Layout.headerHeight : 0),
      marginTop: !isHeaderEmpty ? -(Layout.headerHeight + 20) : 0,
    },
  })

  return (
    <View style={styles.wrap} collapsable={false}>
      <LoadingIcon darkTheme={darkTheme} />
    </View>
  )
}
