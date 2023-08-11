import { Keyboard } from 'react-native'
import React, { useState } from 'react'
import TextInput from '@components/TextInput'
import Icon from 'react-native-fontawesome-pro'
import { Colors } from '@constants'

export default function WalletSearch(): JSX.Element {
  const [text, setText] = useState('')

  return (
    <TextInput
      value={text}
      onChange={(event): void => setText(event.nativeEvent.text)}
      iconInfo={{
        iconComp: <Icon name="magnifying-glass" />,
      }}
      placeholder="ID 또는 지갑주소를 검색할 수 있습니다."
      placeholderTextColor={'#C2C2C2'}
      onSubmitEditing={Keyboard.dismiss}
      onClickClearBtn={(): void => setText('')}
      containerStyle={{
        height: 42,
        backgroundColor: Colors.bg1,
        borderWidth: 0,
        borderRadius: 100,
        width: '100%',
      }}
      style={{
        width: '97%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
      }}
    />
  )
}
