import React, { useState } from 'react'
import { ActivityButtonProps } from './ButtonModel'
import { Colors, Images } from '@constants'
import _ from 'lodash'
import {
  Platform,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import LottieView from 'lottie-react-native'
import { TouchableOpacity } from 'react-native'
import Text from '@components/Text'

export default function ActivityButton(
  props: ActivityButtonProps
): JSX.Element {
  const {
    onPress,
    clicked,
    size = 'md',
    activity,
    disabled,
    activityCount,
    containerStyle,
    isQuest,
    opYn,
  } = props

  const [playAni, setPlayAni] = useState(false)
  const source = Images.lottie[activity]
  const hasCount = !_.isNil(activityCount)

  const iconStyleDefault: Record<
    'md' | 'sm',
    StyleProp<ViewStyle>
  > = {
    sm: {
      width: 43,
      height: 43,
      overflow: 'hidden',
    },
    md: {
      width: 60,
      height: 60,
      overflow: 'hidden',
    },
  }
  const iconStyle: Record<
    'like' | 'hate' | 'likeN' | 'hateN',
    Record<'md' | 'sm', StyleProp<ViewStyle>>
  > = {
    like: iconStyleDefault,
    hate: iconStyleDefault,
    likeN: iconStyleDefault,
    hateN: iconStyleDefault,
  }

  const handleOnPress = (): void => {
    if (onPress) {
      onPress()
      if (
        !disabled &&
        !clicked &&
        Platform.select({
          ios: true,
          android: true,
          default: false,
        })
      ) {
        setPlayAni(true)
      }
    }
  }
  const handleOnPressAni = (): void => {
    if (onPress) {
      onPress()
      if (
        !disabled &&
        clicked &&
        Platform.select({
          ios: true,
          android: true,
          default: false,
        })
      ) {
        setPlayAni(false)
      }
    }
  }

  return (
    <View>
      {playAni ? (
        <TouchableWithoutFeedback onPress={handleOnPressAni}>
          <View
            style={[
              (isQuest || hasCount) && styles.animationOnContainer,
              containerStyle,
            ]}
          >
            <View
              style={[
                size === 'sm' && styles.lottieWrapSm,
                styles.lottieWrap,
              ]}
            >
              <LottieView
                autoPlay={playAni}
                loop={false}
                duration={900}
                source={source}
                onAnimationFinish={(): void => {
                  setPlayAni(false)
                }}
                style={iconStyle[activity][size]}
              />
            </View>
            {isQuest || hasCount ? (
              <Text
                style={[
                  styles.cntText,
                  size === 'sm' && styles.cntTextSm,
                  opYn === 'Y' && styles.cntTextOpY,
                ]}
              >
                {hasCount ? activityCount : '?'}
              </Text>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableOpacity
          onPress={handleOnPress}
          style={styles.animationOffContainer}
        >
          <View
            style={[
              (isQuest || hasCount) && styles.animationOnContainer,
              containerStyle,
            ]}
          >
            <View
              style={[
                size === 'sm' && styles.lottieWrapSm,
                styles.lottieWrap,
              ]}
            >
              <LottieView
                progress={clicked ? 1 : 0}
                source={source}
                style={iconStyle[activity][size]}
              />
            </View>
            {isQuest || hasCount ? (
              <Text
                style={[
                  styles.cntText,
                  size === 'sm' && styles.cntTextSm,
                  opYn === 'Y' && styles.cntTextOpY,
                ]}
              >
                {hasCount ? activityCount : '?'}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  animationOffContainer: { overflow: 'hidden' },
  animationOnContainer: {
    marginRight: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    width: 20,
    height: 20,
  },
  lottieWrapSm: {
    width: 10,
    height: 10,
  },
  cntText: {
    marginHorizontal: 3,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.nagative,
  },
  cntTextSm: {
    fontSize: 12,
    lineHeight: 16,
  },
  cntTextOpY: {
    color: Colors.bl,
  },
})
