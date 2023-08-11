import Body from '@components/Body'
import { BottomButtonOne } from '@components/BottomButton'
import { CommonHeader } from '@components/Header'
import DefaultHeaderLeft from '@components/Header/CommonHeader/DefaultHeaderLeft'
import Text from '@components/Text'
import { Colors, Const, Dev } from '@constants'
import useAuthService from '@hooks/useAuthService'
import { useAlert } from '@hooks/useCommonAlert'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { StackNavigationOptions } from '@react-navigation/stack'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import NavigationService from '@service/NavigationService'
import $t from 'i18n'
import moment from 'moment'
import React, { useState } from 'react'
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
  const [loginedUserInfo, setLoginedUserInfo] = useRecoilState(
    loginedUserInfoState
  )
  const alert = useAlert()
  const [birthDay, setBirthday] = useState<Date>(moment().toDate())
  const [birthDayConfirm, setBirthDayConfirm] =
    useState<boolean>(false)
  const [handleDatePicker, setHandleDatePicker] =
    useState<boolean>(false)

  const [animatedHeight] = useState(new Animated.Value(0))

  const _handleOnChangeDatetime = (
    event: DateTimePickerEvent,
    date?: Date
  ): void => {
    setHandleDatePicker(Platform.OS === 'ios')
    if (birthDay) {
      const formattedDate = moment(date).format('YYYYMMDD')
      setBirthday(date || moment().toDate())
      setBirthDayConfirm(
        moment().diff(formattedDate, 'years') >=
          Const.USER_MINIMUM_AGE
      )
    }
  }
  const _handlePressDate = (): void => {
    setHandleDatePicker(!handleDatePicker)
  }

  const _handlePressNextButton = async (): Promise<void> => {
    Keyboard.dismiss()
    // update birth info api
    const result = { check: true, message: '실패' }
    if (result.check) {
      // todo: 로그인 후 navigation 이동
      const formattedDate = moment(birthDay).format('YYYYMMDD')
      setLoginedUserInfo({
        ...loginedUserInfo,
        birthDay: formattedDate || loginedUserInfo.birthDay,
      })
      // navigateAfterLogin(route.params?.originPwd)
      Dev.log('로그인 후 navigation 이동')
    } else {
      alert({ desc: result.message })
    }
    setHandleDatePicker(false)
  }

  Platform.OS === 'ios' &&
    Animated.timing(animatedHeight, {
      toValue: handleDatePicker ? 220 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()

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
            text={'다음'}
            // title={$t('COMM.COMM_WORD_NEXT')}
            onPress={_handlePressNextButton}
            buttonType={birthDayConfirm ? 'active' : 'enabled'}
          />
        </>
      }
    >
      <BirthText>생년월일</BirthText>
      <View>
        <TouchableOpacity onPress={_handlePressDate}>
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
    // title: $t('USER.USER_WORD_35'), // 메일 인증
    title: '메일인증',
    headerLeft: (): JSX.Element =>
      DefaultHeaderLeft({
        onPress: async (): Promise<void> => {
          NavigationService.goBack()
          if (useAuthService().hasLoggedIn()) {
            await useAuthService().logout()
          }
        },
      }),
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
  border-color: ${Colors.nagative};
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
