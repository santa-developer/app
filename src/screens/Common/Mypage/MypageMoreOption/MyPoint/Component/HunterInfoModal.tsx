import Text from '@components/Text'
import { Colors } from '@constants'
import React from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'
import Button from '@components/Button'

interface HunterModalProps {
  isVisible: boolean
  setHunterModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function HunterInfoModal(
  props: HunterModalProps
): React.JSX.Element {
  const { isVisible, setHunterModal } = props

  // 헌터 모달 닫기
  const hideModal = (): void => {
    setHunterModal(false)
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
      <HunterInfoWrap>
        <View>
          <Text size={18} bold={'500'}>
            헌터
          </Text>
          <Text
            bold={'500'}
            style={{ marginTop: 20, marginBottom: 10 }}
          >
            헌터 활동 안내
          </Text>
          <RowWrap>
            <Text color={Colors.nagative} style={{ marginRight: 5 }}>
              -
            </Text>
            <Text color={Colors.nagative}>
              내가 신고한 게시물이 하이블럭스 운영지침에{`\n`}따라
              블라인드 처리 될 경우 헌터 보상{`\n`} Pool에서 보상이
              이루어집니다. 단, 가장 빨리{`\n`} 신고한 헌터 한명에게
              보상됩니다.
            </Text>
          </RowWrap>
          <RowWrap>
            <Text color={Colors.nagative} style={{ marginRight: 5 }}>
              -
            </Text>
            <Text color={Colors.nagative}>
              보상은 콘텐츠 신고일이 아닌, 관리자 확인일로 {`\n`}
              보상됩니다.
            </Text>
          </RowWrap>
          <Text
            bold={'500'}
            style={{ marginTop: 15, marginBottom: 10 }}
          >
            헌터 자격 조건 안내
          </Text>
          <RowWrap>
            <Text color={Colors.nagative} style={{ marginRight: 5 }}>
              -
            </Text>
            <Text color={Colors.nagative}>
              헌터 자격은 매주 스테이킹 랭킹 100위 안에{`\n`}드는
              회원에게 부과됩니다.
            </Text>
          </RowWrap>
          <RowWrap style={{ marginTop: 10 }}>
            <Text
              size={13}
              color={Colors.nagative}
              style={{ marginRight: 5 }}
            >
              ※
            </Text>
            <Text size={13} color={Colors.nagative}>
              스테이킹(staking)은 암호화폐의 일정량을 지분으로{`\n`}
              고정시키는 행위입니다.
            </Text>
          </RowWrap>
          <Button
            text={'확인'}
            buttonType={'active'}
            onPress={hideModal}
            style={{ marginTop: 25 }}
          />
        </View>
      </HunterInfoWrap>
    </Modal>
  )
}

const HunterInfoWrap = styled.View`
  background-color: ${Colors.wh};
  padding: 25px 15px;
  border-radius: 4px;
  max-width: 340px;
`

const RowWrap = styled.View`
  flex-direction: row;
`
