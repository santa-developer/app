import Button from '@components/Button'
import { ButtonProps } from '@components/Button/ButtonModel'
import React from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'

export function BottomButtonVariousScreen({
  props,
}: {
  props: { item: ButtonProps[] }
}): JSX.Element {
  return (
    <Wrapper isAndroid={Platform.OS === 'android'}>
      {props.item.map((props: ButtonProps, idx: number) => (
        <ButtonFlex key={idx} index={idx}>
          <Button {...props} />
        </ButtonFlex>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.View<{ isAndroid: boolean }>`
  flex-direction: row;
  justify-content: center;
  padding: ${(props): string =>
    props.isAndroid ? '0 15px 15px' : '0 15px'};
`
const ButtonFlex = styled.View<{ index: number }>`
  flex: 1;
  margin-left: ${(props): string =>
    props.index === 0 ? '0px' : '10px'};
`
