import React, { useState } from 'react'
import Body from '@components/Body'
import styled from 'styled-components/native'
import TextInput from '@components/TextInput'
import Text from '@components/Text'
import Button from '@components/Button'
import NavigationService from '@service/NavigationService'
import moment from 'moment'
import { Colors } from '@constants'
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native'
import IconCircleCamera from '@images/svg/IconCircleCamera.svg'
import $t from 'i18n'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import { useRecoilState, useRecoilValue } from 'recoil'
import ImageUtils from '@utils/ImageUtils'
import { trackingMypageInfoState } from '@recoil/atoms/Mypage/mypage'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { BottomButtonOne } from '@components/BottomButton'
import myPage from '@api/mypage.api'
import { getImageForm } from './Component/GetImageForm'
import { VALIDATIONS } from '@utils/ValidationCheck'
import { useAlert } from '@hooks/useCommonAlert'
import useAuthService from '@hooks/useAuthService'
import Modal from 'react-native-modal'

export default function EditProfileScreen(): React.JSX.Element {
  const loginedUserInfo = useRecoilValue(loginedUserInfoState) //  로그인 유저 정보
  const isEditableLevel = (loginedUserInfo?.kycLevel || 0) < 2 //생년월일 수정 여부

  const [trackingMypageInfo, setTrackingMypageInfo] = useRecoilState(
    trackingMypageInfoState
  )
  const mebrMgmtNmbr = loginedUserInfo.mebrMgmtNmbr
  const userInfo = trackingMypageInfo[mebrMgmtNmbr]?.userInfo

  const [profileImg, setProfileImg] = useState(
    userInfo?.mebrFileMgmtNmbr
  ) // 프로필 사진
  const [userId, setUserId] = useState(userInfo?.userId) // 생년월일
  const [userInf, setUserInf] = useState(userInfo?.userInf) // 자기소개
  const userEmil = loginedUserInfo.userEmil // 이메일
  const [webUrl, setWebUrl] = useState(userInfo?.webUrl) // 웹사이트
  const [birthDay, setBirthDay] = useState(
    userInfo?.birthDay
      ? moment(userInfo?.birthDay).toDate()
      : moment().toDate()
  ) //생년월일

  const alert = useAlert()
  const { logout } = useAuthService()

  const [handleDatePicker, setHandleDatePicker] =
    useState<boolean>(false)

  // 데이트피커 노출 여부
  const _handlePressDate = (): void => {
    setHandleDatePicker(true)
  }

  // 데이트  피커 모달 닫기
  const hideModal = (): void => {
    setHandleDatePicker(false)
  }

  // 생년월일 변경 이벤트
  const _handleOnChangeDatetime = (
    event: DateTimePickerEvent,
    date?: Date
  ): void => {
    setHandleDatePicker(Platform.OS === 'ios')
    if (birthDay) {
      // const formattedDate = moment(date).format('YYYYMMDD')
      setBirthDay(date || moment().toDate())
      // setBirthDayConfirm(
      //   moment().diff(formattedDate, 'years') >=
      //     Const.USER_MINIMUM_AGE
      // )
    }
  }

  // 프로필 이미지 변경 이벤트
  const handleChangeProfile = async (): Promise<void> => {
    const image = await getImageForm()
    const result = await myPage.updateMemberImgProc.post(
      {
        imageType: 'P',
        memberImg: image,
        initType: 'N',
      },
      ['profileImg']
    )
    if (result.check) {
      const response = result.response
      setProfileImg(response.mebrFileMgmtNmbr)
    }
  }

  // 저장 버튼
  const handleSaveBtn = async (): Promise<void> => {
    const params = {
      profileImg,
      userId,
      userInf,
      webUrl,
      birthDay,
      userEmil,
    }

    if (params.userId) {
      if (!VALIDATIONS.userId.test(params.userId)) {
        alert({ desc: $t('USER.USER_WORD_03') })
        return
      }
    }
    if (params.userEmil) {
      if (!VALIDATIONS.email.test(params.userEmil)) {
        // Alert.alert({ desc: '이메일이 유효하지 않습니다.' })
        alert({ desc: $t('MP.MP_STC_34') })
        return
      }
    }

    const result = await myPage.updateMemberInfoProc.post({
      params,
    })
    if (result.check) {
      const { userId } = params
      if (loginedUserInfo.userId !== userId) {
        alert({
          // desc: `아이디가 "${params.userId}"로 변경되었습니다 \n다시 로그인 해 주세요`,
          desc: `${$t('MP.MP_STC_35', userId || '')}\n${$t(
            'MP.MP_STC_16'
          )}`,
          onPressConfirm: async () => {
            await logout()
          },
        })
      } else {
        const params = {
          mebrMgmtNmbr: mebrMgmtNmbr,
        }
        const result = await myPage.myInfoProc.get({
          params,
        })

        if (result.check) {
          setTrackingMypageInfo((info) => ({
            ...info,
            [mebrMgmtNmbr]: result.response,
          }))
          alert({
            // 저장되었습니다.
            desc: $t('COMM.COMM_STC_SAVE_PROC'),
            onPressConfirm: async () => {
              NavigationService.navigate('EditMenuScreen')
            },
          })
        } else {
          alert({
            // 저장되었습니다.
            desc: $t('COMM.COMM_STC_SAVE_PROC'),
            onPressConfirm: async () => {
              NavigationService.navigate('EditMenuScreen')
            },
          })
        }
      }
    } else {
      alert({ desc: result.message })
    }
  }

  return (
    <Body
      scrollable={true}
      bottomComponent={
        <BottomButtonOne
          text={$t('COMM.COMM_WORD_SAVE')}
          onPress={handleSaveBtn}
          buttonType={'active'}
        />
      }
    >
      <Animated.ScrollView>
        {/* 프로필 이미지 영역 */}
        <View style={styles.profileImgWrap}>
          <ProfileImg>
            <Image
              source={ImageUtils.getImageSource({
                type: 'user',
                id: profileImg,
                size: 200,
              })}
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
              }}
            />
            <ImgEditBtn onPress={handleChangeProfile}>
              <IconCircleCamera />
            </ImgEditBtn>
          </ProfileImg>
        </View>
        {/* 아이디 수정 */}
        <EditInfoWrap>
          <InputTitle size={14} color={Colors.nagative}>
            {$t('COMM.COMM_WORD_ID')}
          </InputTitle>
          <TextInput
            value={userId}
            editable={userInfo?.modUserIdYn === 'Y'}
            onChangeText={setUserId}
          />
          <View style={styles.flexText}>
            <Text size={14} color={Colors.nagative}>
              {$t('MP.MP_STC_29')}
            </Text>
            <Text
              size={14}
              color={Colors.nagative}
              style={{ marginLeft: 5 }}
            >
              {userInfo?.modUserIdYn === 'N' &&
                `D-${moment(userInfo.userIdModdatetime)
                  .add(31, 'days')
                  .diff(moment(), 'days')}`}
            </Text>
          </View>
        </EditInfoWrap>
        {/* 프로필 소개 */}
        <EditInfoWrap>
          <InputTitleWrap>
            <InputTitle size={14} color={Colors.nagative}>
              {$t('MP.MP_WORD_27')}
            </InputTitle>
            <Text size={12} color={Colors.nagative}>
              {userInf ? userInf.length : 0}
              {` / 80`}
            </Text>
          </InputTitleWrap>
          <FormTextArea
            multiline
            maxLength={80}
            value={userInf}
            onChangeText={setUserInf}
          />
          <Text size={12} color={Colors.nagative}>
            {$t('MP.MP_STC_30')}
          </Text>
        </EditInfoWrap>
        {/* 이메일 변경 */}
        <EditInfoWrap>
          <InputTitle size={14} color={Colors.nagative}>
            {$t('COMM.COMM_WORD_EMAIL')}
          </InputTitle>
          <ConfirmInputBox>
            <InputFlex>
              <TextInput value={userEmil} editable={false} />
            </InputFlex>
            <BtnFlex>
              <Button
                text={'변경'}
                buttonType={'active'}
                onPress={function (): void {
                  NavigationService.navigate('EditEmailScreen')
                }}
              />
            </BtnFlex>
          </ConfirmInputBox>
          <HintText size={12} color={Colors.nagative}>
            {$t('USER.USER_STC_10')}
            {`\n`}
            {$t('USER.USER_STC_18')}
          </HintText>
        </EditInfoWrap>
        {/* 웹사이트 */}
        <EditInfoWrap>
          <InputTitle size={14} color={Colors.nagative}>
            {$t('SPCE.SPCE_WORD_29')}
          </InputTitle>
          <TextInput
            keyboardType={'url'}
            value={webUrl}
            onChangeText={setWebUrl}
          />
        </EditInfoWrap>
        {/* 생년월일 */}
        <EditInfoWrap>
          <InputTitle size={14} color={Colors.nagative}>
            생년월일
          </InputTitle>
          {isEditableLevel ? (
            <>
              <TouchableOpacity onPress={_handlePressDate}>
                <BirthEditable>
                  <Text>{moment(birthDay).format('YYYY-MM-DD')}</Text>
                </BirthEditable>
              </TouchableOpacity>
            </>
          ) : (
            // kyc인증완료(생년월일 수정 불가능)
            <>
              <BirthTextEnable>
                <Text color={Colors.nagative}>
                  {moment(userInfo?.birthDay).format('YYYY-MM-DD')}
                </Text>
              </BirthTextEnable>
              <Text
                color={Colors.nagative}
                size={13}
                style={{ marginTop: 8 }}
              >
                Kyc 인증 완료
              </Text>
            </>
          )}
          {/* 데이트 피커(생년월일) */}

          {handleDatePicker && (
            <Modal
              isVisible={handleDatePicker}
              onBackdropPress={hideModal}
              swipeDirection={'down'}
              animationInTiming={400}
              animationOutTiming={200}
              style={{
                alignItems: 'center',
              }}
            >
              <PickerWrap>
                {Platform.select({
                  ios: true,
                  android: handleDatePicker,
                }) && (
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
                )}
                <Button
                  text={'확인'}
                  buttonType={'active'}
                  onPress={hideModal}
                  style={{ marginTop: 15, width: 310 }}
                />
              </PickerWrap>
            </Modal>
          )}
        </EditInfoWrap>
      </Animated.ScrollView>
    </Body>
  )
}

const styles = StyleSheet.create({
  profileImgWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  flexText: {
    flexDirection: 'row',
  },
})

const ProfileImg = styled.View`
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 50px;
`

const ImgEditBtn = styled.TouchableOpacity`
  position: absolute;
  left: 65%;
  bottom: 0;
  width: 25px;
  height: 25px;
  border-radius: 50px;
`

const EditInfoWrap = styled.View`
  margin: 7px 0;
`

const InputTitle = styled(Text)`
  margin-bottom: 8px;
`

const HintText = styled(Text)`
  line-height: 16px;
`

const InputTitleWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const FormTextArea = styled.TextInput`
  border-radius: 4px;
  border-width: 1px;
  border-color: ${Colors.nagative};
  height: 110px;
  margin-bottom: 4px;
  padding: 8px;
`

const ConfirmInputBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const InputFlex = styled.View`
  flex: 5;
`
const BtnFlex = styled.View`
  margin-left: 5px;
  flex: 1;
`

const BirthTextEnable = styled.View`
  height: 48px;
  background-color: ${Colors.bg1};
  border-width: 1px;
  border-color: ${Colors.disabled};
  border-radius: 4px;
  justify-content: center;
  padding-left: 16px;
`

const BirthEditable = styled.View`
  height: 48px;
  border-width: 1px;
  border-color: ${Colors.nagative};
  border-radius: 4px;
  justify-content: center;
  padding-left: 16px;
`

const PickerWrap = styled.View`
  background-color: #fff;
  border-radius: 4px;
  padding: 0 15px 15px;
  max-width: 340px;
`

EditProfileScreen.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('MP.MP_WORD_28'),
  })
}
