import { Dimensions, FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Text from '@components/Text'
import { Colors } from '@constants'
import Icon from 'react-native-fontawesome-pro'
import styled from 'styled-components/native'
import IconDotLock from '@components/Images/Icon/IconDotLock'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import otp from '@api/otp.api'
import NavigationService from '@service/NavigationService'
import WalletModal from './components/WalletModal'

/**
 * Google OTP 입력 화면
 */
export default function WalletOTP({ route }: any): JSX.Element {
  const [input, setInput] = useState<number[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const { sendHIBS, userId, walletAddress } = route.params

  // OTP 인증
  useEffect(() => {
    if (input.length === 6) {
      otp.authentication.get().then((data) => {
        if (!data.check) {
          setModalVisible(true)
          return
        }
        NavigationService.navigate('WalletPassword', {
          from: 'transfer',
          sendHIBS,
          userId,
          walletAddress,
        })
      })
    }
  }, [input])

  return (
    <View style={{ flex: 1 }}>
      <WalletModal
        text="OTP가 일치하지 않습니다."
        buttonText="확인"
        visible={modalVisible}
        setVisible={(): void => setModalVisible(false)}
      />
      <View
        style={{
          flex: 1.5,
          backgroundColor: Colors.active,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <IconDotLock width="50" height="50" />
        <Text color={Colors.wh} size={20} bold="500">
          Google OTP 번호를 입력하세요.
        </Text>
        <Password input={input} setInput={setInput} />
      </View>
      <KeyPad input={input} setInput={setInput} />
    </View>
  )
}

interface IProps {
  input: number[]
  setInput: React.Dispatch<React.SetStateAction<number[]>>
}

/**
 * 입력 암호화처리 컴포넌트
 */
const Password = ({ input }: IProps): JSX.Element => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5, 6].map((num, index) => (
        <View
          key={num}
          style={{
            width: 15,
            height: 15,
            borderRadius: 10,
            margin: 10,
            backgroundColor: index < input.length ? '#fff' : '#fff',
            opacity: index < input.length ? 1 : 0.4,
          }}
        />
      ))}
    </View>
  )
}

/**
 * 숫자 키패드 컴포넌트
 */
const KeyPad = ({ input, setInput }: IProps): JSX.Element => {
  /**
   * 키패드 버튼에 들어가는 데이터 Array
   */
  const keyPads = [
    {
      keyValue: 1,
    },
    {
      keyValue: 2,
    },
    {
      keyValue: 3,
    },
    {
      keyValue: 4,
    },
    {
      keyValue: 5,
    },
    {
      keyValue: 6,
    },
    {
      keyValue: 7,
    },
    {
      keyValue: 8,
    },
    {
      keyValue: 9,
    },
    { keyValue: -1 },
    {
      keyValue: 0,
    },
    {
      keyValue: (
        <Icon name="arrow-left" size={24} color={Colors.nagative} />
      ),
    },
  ]
  const buttonWidth = Dimensions.get('window').width / 3

  /**
   * renderedKeypad 컴포넌트의 onPress 함수
   */
  const keyPadPress = (value: number | JSX.Element): void => {
    if (typeof value !== 'number') {
      setInput((prev) => [...prev.slice(0, -1)])
      return
    }
    if (input.length < 6) setInput((prev) => [...prev, value])
  }

  /**
   * 키패드 내용이 숫자 및 백스페이스 일떄 입력되는 컴포넌트
   */
  const renderedKeypad = (
    item: number | JSX.Element
  ): JSX.Element => (
    <KeyPadButton
      onPress={(): void => keyPadPress(item)}
      buttonWidth={buttonWidth}
    >
      <Text size={18} bold="500">
        {item}
      </Text>
    </KeyPadButton>
  )
  /**
   * 키패드에 빈칸을 나타내기 위한 컴포넌트
   */
  const emptyPad = (): JSX.Element => <View style={{ flex: 1 }} />

  return (
    <FlatList
      scrollEnabled={false}
      style={{}}
      numColumns={3}
      contentContainerStyle={{
        justifyContent: 'space-between',
        flex: 1,
        paddingVertical: 30,
      }}
      data={keyPads}
      renderItem={(keypad): JSX.Element =>
        keypad.item.keyValue === -1
          ? emptyPad()
          : renderedKeypad(keypad.item.keyValue)
      }
    />
  )
}

interface IStyledProps {
  buttonWidth: number
}
/**
 * 키패드에 있는 각 키의 패드버튼 컴포넌트
 */
const KeyPadButton = styled.TouchableOpacity<IStyledProps>`
  flex: 1;
  align-items: center;
`

WalletOTP.navigationOptions = (): StackNavigationOptions =>
  CommonHeader({
    title: 'OTP 번호 입력',
  })
