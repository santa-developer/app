import CheckBox from '@components/CheckBox'
import IconDotLock from '@components/Images/Icon/IconDotLock'
import Text from '@components/Text'
import { Colors } from '@constants'
import { useConfirm } from '@hooks/useCommonAlert'
import NavigationService from '@service/NavigationService'
import $t from 'i18n'
import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, View } from 'react-native'
import Icon from 'react-native-fontawesome-pro'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

const TEXT_LENGTH = 6

/**
 * 월렛 비밀번호 입력 화면 공통 컴포넌트
 */
export default function WalletPasswordKeybord(props: {
  title: string
  onComplete: (password: number[]) => void
  isResetPswdBtn?: boolean
  isUseBioCheckBox?: boolean
}): JSX.Element {
  const { title, onComplete, isResetPswdBtn, isUseBioCheckBox } =
    props

  const confirm = useConfirm()

  const [input, setInput] = useState<number[]>([])

  // 생체인식
  const [bioCheckboxText, setBioCheckboxText] = useState<string>()
  const [isBioChecked, setIsBioChecked] = useState(false)

  /**
   * todo: Bio 정보 가져와서 text 세팅 (ANDROID: 지문인식/홍채인식 IOS: FaceID/지문인식)
   * 생체인식 정보 세팅
   * 생체인식이 제공되는 기기라면 해당 영역 노출
   */
  const getDeviceBioInfo = (): void => {
    setBioCheckboxText('다음 거래시부터 Face ID 사용하기')
    setIsBioChecked(false)
  }

  /**
   * todo: Bio 정보 가져와서 생체인식으로 거래이용하기 (ANDROID: 지문인식/홍채인식 IOS: FaceID/지문인식)
   * 생체인식으로 거래이용하기 onPress
   */
  const onPressBioButton = (): void => {
    // 디바이스 토큰값 체크.
    // 생체인식이 제공되는 기기라면 해당 영역 노출
    // - ANDROID  지문인식 / 홍채인식- IOS  Face ID / 지문인식
    // - 체크박스 클릭 시 시스템 ALERT창 출력. 확인 시 Face ID 사용 ON으로 적용됨
    // - 허용 안 함 클릭시 체크박스 체크 안됨
    confirm({
      desc: 'bio 인증 사용하여 거래하시겠슴꽈?',
      onPressConfirm: (): void => {
        setIsBioChecked(true)
      },
      onPressCancel: (): void => {
        setIsBioChecked(false)
      },
    })
  }

  useEffect(() => {
    if (isUseBioCheckBox) {
      getDeviceBioInfo()
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (input.length === TEXT_LENGTH) {
        onComplete(input)
        setInput([])
      }
    }, 100)
  }, [input])

  return (
    <View style={{ flex: 1 }}>
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
        <Text
          style={{ textAlign: 'center' }}
          color={Colors.wh}
          size={20}
          bold="500"
        >
          {title}
        </Text>
        <Password input={input} setInput={setInput} />
        {isResetPswdBtn && (
          <TouchableOpacity
            onPress={(): void =>
              NavigationService.navigate('ResetAuthentication')
            }
          >
            <Text color={Colors.wh} size={12} bold="400">
              {/* 비밀번호 재설정 > */}
              {`${$t('WALT.WALT_WORD_02')} >`}
            </Text>
          </TouchableOpacity>
        )}
        {isUseBioCheckBox && (
          <View style={{ flexDirection: 'row', marginTop: 50 }}>
            {/* <CheckBox /> */}
            <CheckBox
              title={bioCheckboxText}
              titleStyle={{
                fontSize: 14,
                fontWeight: '400',
                color: Colors.wh,
              }}
              checked={isBioChecked}
              onPress={onPressBioButton}
            />
          </View>
        )}
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
            backgroundColor:
              index < input.length ? Colors.wh : Colors.wh,
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
      setInput([...input.slice(0, -1)])
      return
    }
    if (input.length < TEXT_LENGTH) setInput([...input, value])
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

/**
 * 키패드에 있는 각 키의 패드버튼 컴포넌트
 */
const KeyPadButton = styled.TouchableOpacity<{ buttonWidth: number }>`
  flex: 1;
  align-items: center;
`
