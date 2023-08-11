import { Colors } from '@constants'
import React, { useEffect, useState } from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

const knobOffset = 18

interface ToggleSwitchProps extends TouchableOpacityProps {
  isOn: boolean
}

export default function ToggleSwitchScreen({
  props,
}: {
  props: ToggleSwitchProps
}): JSX.Element {
  const { isOn, disabled, ...rest } = props

  const animatedValue = useState(
    new Animated.Value(isOn ? knobOffset : 0)
  )[0]

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? knobOffset : 0,
      easing: Easing.bezier(0.42, 0, 0.58, 1),
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [isOn])

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={disabled}
      style={{
        width: 43,
        height: 25,
        padding: 3,
        borderRadius: 25,
        backgroundColor: props.isOn ? Colors.active : Colors.disabled,
      }}
      {...rest}
    >
      <Animated.View
        style={[
          styles.animation,
          {
            transform: [
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, knobOffset],
                  outputRange: [0, knobOffset],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  animation: {
    width: 19,
    height: 19,
    borderRadius: 19,
    backgroundColor: Colors.wh,
    shadowColor: Colors.nagative,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
})
