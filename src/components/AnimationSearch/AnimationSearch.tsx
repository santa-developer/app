import { Colors, Layout } from '@constants'
import React, { useRef, useState } from 'react'
import { Animated, TextInput } from 'react-native'
import Icon from 'react-native-fontawesome-pro'
import styled from 'styled-components/native'

// 디자인 필요

export default function AnimationSearchScreen(): JSX.Element {
  const [focus, setFocus] = useState(false)
  const width = useRef(new Animated.Value(100)).current // initial width
  const textRef = useRef<TextInput>(null)

  React.useEffect(() => {
    if (focus) {
      textRef.current?.focus()
    }

    Animated.timing(width, {
      toValue: focus ? Layout.bodyWidth : 40,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [focus])

  return (
    <SearchContainer>
      <Animated.View style={{ width }}>
        <SearchInput
          ref={textRef}
          onFocus={(): void => setFocus(true)}
          onBlur={(): void => setFocus(false)}
          value={focus ? 'text' : ''}
        />
      </Animated.View>
      <SearchButton onPress={(): void => setFocus(!focus)}>
        <Animated.Text>
          <Icon
            name={'magnifying-glass'}
            type="solid"
            color={Colors.active}
          />
        </Animated.Text>
      </SearchButton>
    </SearchContainer>
  )
}

const SearchContainer = styled.View`
  position: relative;
  padding: 10px;
`

const SearchInput = styled(TextInput)`
  height: 40px;
  border-width: 1px;
  padding: 10px;
  border-color: gray;
  border-radius: 50px;
`

const SearchButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 19px;
`
