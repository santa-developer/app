import Body from '@components/Body'
import { BottomButtonOne } from '@components/BottomButton'
import { CommonHeader } from '@components/Header'
import Text from '@components/Text'
import { Colors, Const } from '@constants'
import { SocialType } from '@models/Auth/USER_INFO'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { StackNavigationOptions } from '@react-navigation/stack'
import { SignUpUserInfoState } from '@recoil/atoms/Auth/signUp'
import NavigationService from '@service/NavigationService'
import $t from 'i18n'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import {
  Animated,
  Keyboard,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native'
import { useRecoilState } from 'recoil'
import styled from 'styled-components/native'

function StepBirth(): React.JSX.Element {
  const [userInfo, setUserInfo] = useRecoilState(SignUpUserInfoState)
  const [birthDay, setBirthday] = useState<Date>(moment().toDate())
  const [birthDayConfirm, setBirthDayConfirm] =
    useState<boolean>(false)
  const [handleDatePicker, setHandleDatePicker] =
    useState<boolean>(true)

  const [animatedHeight] = useState(new Animated.Value(0))

  const _handleOnChangeDatetime = (
    event: DateTimePickerEvent,
    date?: Date
  ): void => {
    setHandleDatePicker(Platform.OS === 'ios')
    if (date) {
      const formattedDate = moment(date).format('YYYYMMDD')
      setBirthday(date)
      setUserInfo({ ...userInfo, birthDay: formattedDate })
      setBirthDayConfirm(
        moment().diff(formattedDate, 'years') >=
          Const.USER_MINIMUM_AGE
      )
    }
  }
  // const _handlePressDate = (): void => {
  //   setHandleDatePicker(!handleDatePicker)
  // }

  const _handlePressNextButton = async (): Promise<void> => {
    Keyboard.dismiss()
    Platform.OS === 'ios' && setHandleDatePicker(false)
    if (userInfo.socialType === SocialType.Apple) {
      NavigationService.navigate('SignUpStepAgreement')
    } else {
      NavigationService.navigate('SignUpStepPw')
    }
    setHandleDatePicker(false)
  }

  // DatePicker 위치 조정
  Platform.OS === 'ios' &&
    Animated.timing(animatedHeight, {
      toValue: handleDatePicker ? 220 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()

  useEffect(() => {
    setHandleDatePicker(true)
  }, [])
  return (
    <Body
      bottomComponent={
        <>
          {Platform.select({
            ios: true,
            android: handleDatePicker,
          }) && (
            <Animated.View
              style={{
                height: animatedHeight,
              }}
            >
              <View style={{ flex: 1 }}>
                <DateTimePicker
                  nativeID="stepBirthDateTimePicker"
                  minimumDate={moment()
                    .set({
                      year: 1920,
                      month: 1,
                      date: 1,
                    })
                    .toDate()}
                  maximumDate={moment().toDate()}
                  value={birthDay}
                  onChange={_handleOnChangeDatetime}
                  display={'spinner'}
                />
              </View>
            </Animated.View>
          )}
          <BottomButtonOne
            // text={'다음'}
            text={$t('COMM.COMM_WORD_NEXT')}
            onPress={_handlePressNextButton}
            buttonType={birthDayConfirm ? 'active' : 'enabled'}
          />
        </>
      }
    >
      <BirthText>{$t('USER.USER_WORD_BIRTH')}</BirthText>
      <View>
        <TouchableOpacity>
          <DateBtn>
            <DateBtnText>
              {moment(birthDay).format('YYYY-MM-DD')}
            </DateBtnText>
          </DateBtn>
        </TouchableOpacity>
        <HintMsgText>
          {/* 14세 미만인 경우 앱을 이용할 수 없습니다. 허위정보를 기재할
          경우 불이익이 있을 수 있습니다. */}
          {$t('USER.USER_STC_41', Const.USER_MINIMUM_AGE)}
        </HintMsgText>
      </View>
    </Body>
  )
}

export default StepBirth

/**
 * navigation 옵션
 */
StepBirth.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('USER.USER_WORD_SELECT_BIRTH'), // 생년월일 선택
  })
}

const BirthText = styled(Text)`
  font-size: 14px;
  color: ${Colors.nagative};
  margin-bottom: 8px;
`

// 전체영역
const DateBtn = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  height: 50px;
  padding-left: 10px;
  border-width: 1px;
  color: ${Colors.nagative};
  border-radius: 5px;
`
const DateBtnText = styled(Text)`
  font-size: 14px;
`
const HintMsgText = styled.Text`
  color: ${Colors.nagative};
  margin-bottom: 8px;
  font-size: 13px;
`
