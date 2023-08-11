import React from 'react'
import styled from 'styled-components/native'
import Modal from 'react-native-modal'
import { Colors, Layout } from '@constants'
import Text from '@components/Text'
import Button from '@components/Button'

interface ModalProps {
  isModal: boolean
  onPress: React.Dispatch<React.SetStateAction<boolean>>
  reason: string
}

export default function DenyModal(props: ModalProps): JSX.Element {
  const { isModal, onPress, reason } = props

  const handleModal = (): void => {
    onPress(false)
  }

  return (
    <Modal
      isVisible={isModal}
      deviceWidth={Layout.window.width}
      deviceHeight={Layout.window.height}
      onBackdropPress={handleModal}
    >
      <ModalContainer>
        <Text
          size={20}
          bold={`500`}
          color={Colors.bl}
        >{`반려사유 확인`}</Text>

        <Notice>
          <Text
            size={14}
            bold={`normal`}
            color={Colors.nagative}
          >{`신청하신 KYC 인증이 반려되었습니다.`}</Text>
          <Text
            size={14}
            bold={`normal`}
            color={Colors.nagative}
          >{`하단의 반려사유 확인 후 다시 KYC인증을 해주세요.`}</Text>
        </Notice>

        <MessageBox>
          <Text size={14} bold={`normal`} color={Colors.nagative}>
            {reason}
          </Text>
        </MessageBox>

        <Button
          text="확인"
          buttonType="active"
          textStyle={{ fontSize: 16 }}
          onPress={handleModal}
        />
      </ModalContainer>
    </Modal>
  )
}

const ModalContainer = styled.View`
  width: 100%;
  height: 328px;
  border-radius: 4px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: ${Colors.wh};
`

const Notice = styled.View`
  align-items: center;
  margin-top: 20px;
`

const MessageBox = styled.ScrollView`
  width: 100%;
  height: 84px;
  background-color: ${Colors.gr};
  border: 1px solid ${Colors.bg1};
  margin: 19.5px 0 30px 0;
`
