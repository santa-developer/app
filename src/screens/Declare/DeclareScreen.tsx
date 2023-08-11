import commonApi from '@api/common.api'
import declareApi from '@api/declare.api'
import Body from '@components/Body'
import { BottomButtonOne } from '@components/BottomButton'
import RadioButton from '@components/RadioButton'
import TextInput from '@components/TextInput'
import { useAlert } from '@hooks/useCommonAlert'
import CODE from '@models/Common/CODE'
import { StackScreenProps } from '@react-navigation/stack'
import NavigationService, {
  RootStackParamList,
} from '@service/NavigationService'
import $t from 'i18n'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

type Props = StackScreenProps<RootStackParamList, 'Declare'>

export default function DeclareScreen(props: Props): JSX.Element {
  const { code: declareCode, reportId } = props.route.params

  const [selectedCode, setSelectedCode] = useState('')
  const [decContent, setDecContent] = useState('')
  const [declareList, setDeclareList] = useState<CODE[]>([])

  const alert = useAlert()

  const handleRadioBtnPress = (type: string): void => {
    setSelectedCode(() => type)
  }

  // 게시물 신고
  const bltbDecProc = async (): Promise<void> => {
    const result = await declareApi.bltbDecProc.post({
      params: {
        postMgmtNmbr: reportId,
        decCottDvsnCode: selectedCode,
        decCott: decContent,
      },
    })
    if (result.check) {
      alert({
        // desc: '신고가 정상적으로 접수 되었습니다.',
        desc: $t('BD.BD_STC_05'),
        onPressConfirm: () => {
          NavigationService.goBack()
        },
      })
    } else {
      alert({ desc: result.message })
    }
  }

  // 댓글 신고
  const comtDecProc = async (): Promise<void> => {
    const result = await declareApi.comtDecProc.post({
      params: {
        comtMgmtNmbr: reportId,
        decCottDvsnCode: selectedCode,
        decCott: decContent,
      },
    })
    if (result.check) {
      alert({
        // desc: '신고가 정상적으로 접수 되었습니다.',
        desc: $t('BD.BD_STC_05'),
        onPressConfirm: () => {
          NavigationService.goBack()
        },
      })
    } else {
      alert({ desc: result.message })
    }
  }

  // 유저 신고
  const userDecProc = async (): Promise<void> => {
    const result = await declareApi.userDecProc.post({
      params: {
        mebrMgmtNmbr: reportId,
        decCottDvsnCode: selectedCode,
        decCott: decContent,
      },
    })
    if (result.check) {
      alert({
        // desc: '신고가 정상적으로 접수 되었습니다.',
        desc: $t('BD.BD_STC_05'),
        onPressConfirm: () => {
          NavigationService.goBack()
        },
      })
    } else {
      alert({ desc: result.message })
    }
  }

  // 게시물 신고
  const reportBtnClick = async (): Promise<void> => {
    if (selectedCode) {
      switch (declareCode) {
        case 'DEC_COTT_DVSN_CODE':
          // 게시물 신고
          bltbDecProc()
          break
        case 'DEC_COMT_CODE':
          // 댓글 신고
          comtDecProc()
          break
        case 'DEC_USER_CODE':
          // 유저 신고
          userDecProc()
          break
      }
    }
  }

  // 초기화
  const initialize = async (): Promise<void> => {
    // 게시물 신고 관련 정보 가져오기
    const result = await commonApi.code.listProc.get({
      grupCode: [declareCode],
    })
    setDeclareList(() => result.response.list)
  }

  useEffect(() => {
    initialize()
  }, [])

  return (
    <Body
      bottomComponent={
        <BottomButtonOne
          buttonType={
            selectedCode !== '99' ||
            (selectedCode === '99' && !_.isEmpty(decContent))
              ? 'active'
              : 'enabled'
          }
          onPress={reportBtnClick}
          text="신고하기"
        />
      }
    >
      <View style={styles.wrapper}>
        {declareList &&
          declareList.map((item) => (
            <RadioButton
              key={item.code}
              checked={item.code === selectedCode}
              onPress={(): void => handleRadioBtnPress(item.code)}
              desc={$t(item.msgCode)}
            />
          ))}
        {selectedCode === '99' && (
          <TextInput
            multiline
            maxLength={200}
            style={{ height: 100 }}
            scrollEnabled
            placeholder={'기타 사유를 입력하세요.'}
            value={decContent}
            onChangeText={(text: string): void => {
              setDecContent(text)
            }}
          />
        )}
      </View>
    </Body>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 20,
    paddingVertical: 20,
    flexDirection: 'column',
  },
})
