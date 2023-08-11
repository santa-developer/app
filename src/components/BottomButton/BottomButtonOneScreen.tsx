import Button from '@components/Button'
import { ButtonProps } from '@components/Button/ButtonModel'
import React from 'react'
import { StyleSheet } from 'react-native'

export function BottomButtonOneScreen({
  props,
}: {
  props: ButtonProps
}): JSX.Element {
  return <Button {...props} buttonStyle={styles.buttonStyle} />
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 0,
  },
})

// const Wrapper = styled.View<{ isAndroid: boolean }>`
//   flex-direction: row;
//   justify-content: center;
//   padding: ${(props): string =>
//     props.isAndroid ? '0 15px 15px' : '0 15px'};
// `
