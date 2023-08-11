import React from 'react'
import styled from 'styled-components/native'
import Modal from 'react-native-modal'
import { Colors } from '@constants'
import Text from '@components/Text'
import Button from '@components/Button'
import NavigationService from '@service/NavigationService'

interface HunterModalProps {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function HunterModal(
  props: HunterModalProps
): React.JSX.Element {
  const { isVisible, setIsVisible } = props

  const hideModal = (): void => {
    setIsVisible(false)
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={hideModal}
      swipeDirection={'down'}
      animationInTiming={400}
      animationOutTiming={200}
      style={{
        alignItems: 'center',
      }}
    >
      <HunterModalWrap>
        <Text size={18} bold={'500'}>
          헌터
        </Text>
        <Text bold={'500'} style={{ marginTop: 20 }}>
          헌터 활동 안내
        </Text>
        <TextWrap style={{ marginTop: 10 }}>
          <Text color={Colors.nagative}>-</Text>
          <Text color={Colors.nagative}>
            내가 신고한 게시물이 하이블럭스 운영지침에 따라 블라인드
            처리 될 경우 헌터보상 Pool에서 보상이 이루어집니다. 단,
            가장 빨리 신고한 헌터 한명에게 보상됩니다.
          </Text>
        </TextWrap>
        <TextWrap>
          <Text color={Colors.nagative}>-</Text>
          <Text color={Colors.nagative}>
            보상은 콘텐츠 신고일이 아닌, 관리자 확인일로 보상됩니다.
          </Text>
        </TextWrap>
        <Text bold={'500'} style={{ marginTop: 15 }}>
          헌터 자격 조건 안내
        </Text>
        <TextWrap style={{ marginTop: 10 }}>
          <Text color={Colors.nagative}>-</Text>
          <Text color={Colors.nagative}>
            헌터 자격은 매주 스테이킹 랭킹 100위 안에드는 회원에게
            부여됩니다.
          </Text>
        </TextWrap>
        <TextWrap style={{ marginTop: 10 }}>
          <Text color={Colors.nagative}>※</Text>
          <Text color={Colors.nagative}>
            스테이킹(staking)은 암호화폐의 일정량을 지분으로
            고정시키는 행위입니다.
          </Text>
        </TextWrap>
        <Button
          text={`스테이킹 하러가기 >`}
          buttonType={'staking'}
          onPress={(): void => {
            NavigationService.navigate('Wallet')
            hideModal()
          }}
          style={{ marginTop: 25 }}
        />
        <Button
          text={'확인'}
          buttonType={'active'}
          onPress={hideModal}
          style={{ marginTop: 10 }}
        />
      </HunterModalWrap>
    </Modal>
  )
}

const HunterModalWrap = styled.View`
  background-color: ${Colors.wh};
  padding: 20px 15px;
  border-radius: 4px;
  width: 100%;
`
const TextWrap = styled.View`
  flex-direction: row;
`
