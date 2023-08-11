import mail from '@api/mailInquiries.api'
import Body from '@components/Body'
import { BottomButtonOne } from '@components/BottomButton'
import CheckBox from '@components/CheckBox'
import { BodyKeyboardDismiss } from '@components/Common/BodyKeyboardDismiss'
import Text from '@components/Text'
import TextInput from '@components/TextInput'
import { Colors } from '@constants'
import { useAlert } from '@hooks/useCommonAlert'
import { MailInquiriesState } from '@recoil/atoms/Mypage/mailInquiries'
import { InputText } from '@screens/Auth/Login/StepEmailScreen'
import { CheckView } from '@screens/Auth/SignUp/components/AgreementSection'
import NavigationService from '@service/NavigationService'
import { VALIDATIONS } from '@utils/ValidationCheck'
import $t from 'i18n'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { useRecoilState, useResetRecoilState } from 'recoil'
import styled from 'styled-components/native'

// const SELECT_FILE_MAX = 10

export default function MailInquiriesScreen(): React.JSX.Element {
  const alert = useAlert()
  const resetMailInquiries = useResetRecoilState(MailInquiriesState)
  const [mailInquiries, setMailInquiries] = useRecoilState(
    MailInquiriesState
  )
  const [agreement, setAgreement] = useState<boolean>(false)

  // todo: 이미지 선택 callback
  /*
  const _pickImages = (images: ImageProps[]): void => {
    const files = _.map(images, (image) => {
      return {
        uri: image.uri,
        name: image.name || image.uri.split('/').pop() || 'no_name',
        type: 'image/jpg',
        width: image.width,
        height: image.height,
      }
    })
    setMailInquiries({ ...mailInquiries, questionFiles: files })
  }
  */

  const validation = (): string => {
    const { userEmail, contents } = mailInquiries
    let error = ''

    if (!agreement) {
      // 개인정보 수집 및 이용동의를 체크해주세요.
      error = $t('COMM.COMM_STC_34')
    } else if (!(userEmail.length > 0)) {
      // 이메일을 입력해주세요.
      error = $t('COMM.COMM_STC_35')
    } else if (!VALIDATIONS.email.test(userEmail)) {
      // 이메일을 확인해주세요.
      error = $t('COMM.COMM_STC_36')
    } else if (!contents) {
      // 내용을 입력해주세요.
      error = $t('COMM.COMM_STC_37')
    } else {
      error = ''
    }
    return error
  }

  // 저장
  const _handleSubmitBtn = (): void => {
    // 유효성 체크
    const error = validation()
    if (error) {
      alert({ desc: error })
      return
    }
    mail.mailProc
      .post({
        params: mailInquiries,
      })
      .then((result) => {
        if (result.check) {
          alert({
            // desc: '정상적으로 접수되었습니다.\n감사합니다.',
            desc: $t('COMM.COMM_STC_04'),
            onPressConfirm: () => {
              resetMailInquiries()
              NavigationService.goBack()
            },
          })
        } else {
          alert({ desc: result.message })
        }
      })
  }

  useEffect(() => {
    setMailInquiries({
      ...mailInquiries,
      deviceType: DeviceInfo.getModel(),
      appVersion: `2.31.30`,
      // 버전정보, 코드푸시 정보 업데이트 후 활성화
      // appVersion: `${VersionNumber.appVersion}.${CommonStore.codePushLabel}`,
    })
  }, [])

  return (
    <Body
      scrollable
      bottomComponent={
        <BottomButtonOne
          // text={'저장'}
          text={$t('COMM.COMM_WORD_SAVE')}
          onPress={_handleSubmitBtn}
          buttonType={'active'}
        />
      }
    >
      <BodyKeyboardDismiss />
      <CheckView>
        <CheckBox
          checked={agreement}
          onPress={(): void => {
            setAgreement((prev) => !prev)
          }}
          // title={'개인정보 수집 및 이용동의'}
          title={`${$t('COMM.COMM_WORD_132')}`}
        />
      </CheckView>

      <AgreementDescWrap>
        <Text style={{ marginBottom: 10 }}>
          {/*- 문의 접수를 위한 개인정보 수집 동의가 필요합니다.*/}
          {$t('COMM.COMM_STC_29')}
        </Text>
        <AgreementDesc>
          {/*- 수집항목: 이메일, 휴대폰 모델명, 문의내용에 포함된 개인정보*/}
          {$t('COMM.COMM_STC_30')}
        </AgreementDesc>
        <AgreementDesc>
          {/*- 수집목적: 문의내역 확인 및 답변 처리*/}
          {$t('COMM.COMM_STC_31')}
        </AgreementDesc>
        <AgreementDesc>
          {/*- 보유기간: 1년 / 보관기간 만료 시 파기*/}
          {$t('COMM.COMM_STC_32')}
        </AgreementDesc>
      </AgreementDescWrap>

      <InputText marginTop={'20'}>
        {/*이메일*/}
        {`${$t('COMM.COMM_WORD_EMAIL')}`}
      </InputText>
      <TextInput
        // placeholder={`이메일`}
        placeholder={$t('COMM.COMM_WORD_EMAIL')}
        keyboardType="email-address"
        value={mailInquiries.userEmail}
        onChangeText={(text: string): void =>
          setMailInquiries({
            ...mailInquiries,
            userEmail: _.toLower(text).trim(),
          })
        }
        onClickClearBtn={(): void =>
          setMailInquiries({
            ...mailInquiries,
            userEmail: '',
          })
        }
      />
      {/* * 해당 이메일로 답변 드립니다.*/}
      <Text size={12} color={Colors.nagative}>
        * {$t('COMM.COMM_STC_33')}
      </Text>

      <InputText marginTop={'20'}>
        {/*내용*/}
        {`${$t('COMM.COMM_WORD_129')}`}
      </InputText>
      <TextArea
        multiline
        maxLength={1000}
        value={mailInquiries.contents}
        // placeholder={`문의내용을 입력하세요.`}
        placeholder={$t('COMM.COMM_STC_37')}
        onChangeText={(text): void =>
          setMailInquiries({
            ...mailInquiries,
            contents: text,
          })
        }
      />

      <InputText marginTop={'20'}>
        {/*기종*/}
        {`${$t('COMM.COMM_WORD_130')}`}
      </InputText>
      <TextInput
        value={mailInquiries.deviceType}
        editable={false}
        containerStyle={{
          backgroundColor: Colors.bg1,
          borderColor: Colors.disabled,
        }}
      />

      <InputText marginTop={'20'}>
        {/*앱버전*/}
        {`${$t('COMM.COMM_WORD_131')}`}
      </InputText>
      <TextInput
        // value={reportInfo.appVersion}
        editable={false}
        containerStyle={{
          backgroundColor: Colors.bg1,
          borderColor: Colors.disabled,
        }}
      />

      <InputText marginTop={'20'}>
        {/*첨부 이미지*/}
        {`${$t('COMM.COMM_WORD_03')}`}
      </InputText>
      {/* * 이미지는 최대 10장까지 등록 가능합니다.*/}
      <Text size={12} color={Colors.nagative}>
        * {$t('QEST.QEST_STC_59')}
      </Text>
      <ScrollView horizontal={true} style={{ marginTop: 10 }}>
        <View style={{ paddingVertical: 5 }}>
          {/* <SelectFile
            selected={mailInquiries.questionFiles}
            callBack={_pickImages}
            selMaximum={SELECT_FILE_MAX}
            isOpend={false}
          /> */}
        </View>
      </ScrollView>
    </Body>
  )
}
const AgreementDescWrap = styled.View`
  margin-top: 10px;
  padding: 15px 10px;
  background-color: ${Colors.gr};
  border-color: ${Colors.bg1};
  border-width: 1px;
`
const AgreementDesc = styled(Text)`
  font-size: 12px;
  color: ${Colors.nagative};
`
const TextArea = styled(TextInput)`
  min-height: 160px;
`
