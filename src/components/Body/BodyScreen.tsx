import React, { useState } from 'react'
import {
  Animated,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from 'react-native'
import { Layout } from '@constants'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'
import { BodyProps } from './BodyModel'

export default function BodyScreen(props: BodyProps): JSX.Element {
  const { useHeader = true, hidePadding = false, ...rest } = props

  const [refreshing, setRefreshing] = useState<boolean>(false)

  const _onRefresh = async (): Promise<void> => {
    if (props.onRefresh) {
      setRefreshing(true)
      await props.onRefresh()
      setRefreshing(false)
    }
  }

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    keyboardAvoiding: {
      flex: 1,
    },
    container: {
      padding: hidePadding ? 0 : 15,
      flex: 1,
    },
  })

  return (
    <SafeAreaView style={styles.wrapper}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <KeyboardAvoidingView
        enabled={props.keyboardAvoidingEnabled}
        behavior={Platform.select({
          ios: 'padding',
          android: 'height',
        })}
        keyboardVerticalOffset={
          useHeader
            ? Layout.headerHeight +
              StaticSafeAreaInsets.safeAreaInsetsBottom +
              StaticSafeAreaInsets.safeAreaInsetsTop
            : 0
        }
        style={styles.keyboardAvoiding}
      >
        {props.scrollable ? (
          <>
            {props.disableRefresh ? (
              <Animated.ScrollView
                ref={props.scrollViewRef}
                onScroll={props.onScroll}
                scrollEventThrottle={300}
                onMomentumScrollBegin={props.onMomentumScrollBegin}
                onMomentumScrollEnd={props.onMomentumScrollEnd}
                keyboardShouldPersistTaps={
                  props.keyboardShouldPersistTaps
                }
              >
                <View
                  {...rest}
                  style={[styles.container, rest.style]}
                />
              </Animated.ScrollView>
            ) : props.hideRefresh ? (
              <Animated.ScrollView
                ref={props.scrollViewRef}
                onScroll={props.onScroll}
                scrollEventThrottle={300}
                onMomentumScrollBegin={props.onMomentumScrollBegin}
                onMomentumScrollEnd={props.onMomentumScrollEnd}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={_onRefresh}
                    style={{
                      opacity: 0,
                      backgroundColor: 'transparent',
                    }}
                    progressBackgroundColor="transparent"
                    tintColor="transparent"
                    colors={['transparent']}
                    progressViewOffset={-200}
                  />
                }
              >
                <View
                  {...rest}
                  style={[styles.container, rest.style]}
                />
              </Animated.ScrollView>
            ) : (
              <Animated.ScrollView
                ref={props.scrollViewRef}
                onScroll={props.onScroll}
                keyboardShouldPersistTaps="handled"
                scrollEventThrottle={300}
                onMomentumScrollBegin={props.onMomentumScrollBegin}
                onMomentumScrollEnd={props.onMomentumScrollEnd}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={_onRefresh}
                    style={props.refreshControlStyle}
                  />
                }
              >
                <View
                  {...rest}
                  style={[styles.container, rest.style]}
                />
              </Animated.ScrollView>
            )}
          </>
        ) : (
          <View {...rest} style={[styles.container, rest.style]} />
        )}
        {props.bottomComponent && (
          <View style={{ marginTop: 0 }}>
            {props.bottomComponent}
          </View>
        )}
      </KeyboardAvoidingView>
      {/* </TouchableWithoutFeedback> */}
    </SafeAreaView>
  )
}
