import Text from '@components/Text'
import { Colors } from '@constants'
import $t from 'i18n'
import _ from 'lodash'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import {
  alertPropsState,
  isConfirmState,
  isVisibleState,
} from '@recoil/atoms/alert'

import styled from 'styled-components/native'
import { initAlertProps } from '@models/ALERT'

export default function AlertScreen(): JSX.Element {
  const [isVisible, setIsVisible] = useRecoilState(isVisibleState)
  const [isConfirm, setIsConfirm] = useRecoilState(isConfirmState)
  const alertInfo = useRecoilValue(alertPropsState)

  const {
    // disableBackdropClose,
    title,
    // fontSize,
    onCancelBtnText,
    onConfirmBtnText,
    onPressConfirm,
    onPressCancel,
    desc,
    showVotingRemainTime,
  } = alertInfo

  const handlePress = (): void => {
    // if (!disableBackdropClose) {
    //   setIsVisible(false)
    //   isConfirm ? onPressCancel?.() : onPressConfirm?.()
    // }
  }

  const setAlertData = useSetRecoilState(alertPropsState)

  return (
    <>
      {isVisible && (
        <TouchableWithoutFeedback onPress={handlePress}>
          <Wrapper>
            <Container>
              {_.some(title) && (
                <Title>
                  <TitleText color={Colors.bl} size={18} bold="500">
                    {title}
                  </TitleText>
                </Title>
              )}

              <Desc>
                <DescText color={Colors.nagative}>
                  {showVotingRemainTime
                    ? desc //+ MyPageStore.remainTimeFormat
                    : desc}
                </DescText>
              </Desc>
              <AlertBtnGroup>
                <AlertBtn
                  type={'confirm'}
                  onPress={(): void => {
                    setAlertData(initAlertProps)
                    setIsVisible(false)
                    isConfirm && setIsConfirm(false)
                    onPressConfirm && onPressConfirm()
                  }}
                >
                  <Text color={Colors.wh} size={16}>
                    {onConfirmBtnText || $t('COMM.COMM_WORD_CONFIRM')}
                  </Text>
                </AlertBtn>
                {isConfirm && (
                  <AlertBtn
                    type={'cancel'}
                    onPress={(): void => {
                      setAlertData(initAlertProps)
                      setIsVisible(false)
                      setIsConfirm(false)
                      onPressCancel && onPressCancel()
                    }}
                  >
                    <Text color={Colors.wh} size={16}>
                      {onCancelBtnText || $t('COMM.COMM_WORD_CANCEL')}
                    </Text>
                  </AlertBtn>
                )}
              </AlertBtnGroup>
            </Container>
          </Wrapper>
        </TouchableWithoutFeedback>
      )}
    </>
  )
}

const Wrapper = styled.View`
  z-index: 1;
  align-items: center;
  background-color: #000000aa;
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  padding: 15px;
`

const Container = styled.View`
  width: 100%;
  border-radius: 5px;
  background-color: white;
  padding: 25px 15px 20px;
`

const Title = styled.View`
  margin-bottom: 20px;
`
const TitleText = styled(Text)`
  text-align: center;
`
const Desc = styled.View`
  margin-bottom: 25px;
  justify-content: center;
  align-items: center;
`
const DescText = styled(Text)`
  text-align: center;
`
const AlertBtnGroup = styled.View`
  flex-direction: row;
  background-color: ${Colors.gr};
  border-radius: 5px;
`
const AlertBtn = styled.TouchableOpacity<{ type: string }>`
  align-items: center;
  padding: 14px 0;
  flex: 1;
  border-radius: 4px;
  background-color: ${(props): string =>
    props.type === 'confirm' ? Colors.active : Colors.nagative};
  margin-left: ${(props): number =>
    props.type === 'cancel' ? 5 : 0}px;
`
