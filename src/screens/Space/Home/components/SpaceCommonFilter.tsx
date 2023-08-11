import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import BottomModal from '@components/BottomModal'
import IconRotateCw from '@components/Images/Icon/IconRotateCw'
import { Colors } from '@constants'
import Text from '@components/Text'

interface IProps {
  isBottomModal: boolean
  setIsBottomModal: React.Dispatch<React.SetStateAction<boolean>>
  selectedButton: string
  setSelectedButton: React.Dispatch<React.SetStateAction<string>>
}
/**
 * 스페이스 검색에서 사용되는 공용 모달필터
 */
export default function SpaceCommonFilter({
  isBottomModal = false,
  setIsBottomModal,
  selectedButton = '최신순',
  setSelectedButton,
}: IProps): JSX.Element {
  return (
    <BottomModal
      isVisible={isBottomModal}
      onBackdropPress={(): void => setIsBottomModal(false)}
    >
      <View
        style={{
          width: '100%',
          gap: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text size={18} bold="700">
            필터
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <IconRotateCw color={Colors.disabled} />
            <Text>초기화</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            gap: 5,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor:
                selectedButton === '최신순'
                  ? Colors.active
                  : Colors.disabled,
              borderRadius: 35,
              paddingVertical: 8,
              paddingHorizontal: 22,
            }}
            onPress={(): void => setSelectedButton('최신순')}
          >
            <Text
              color={
                selectedButton === '최신순'
                  ? Colors.active
                  : Colors.disabled
              }
            >
              최신순
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor:
                selectedButton === '인기순'
                  ? Colors.active
                  : Colors.disabled,
              borderRadius: 35,
              paddingVertical: 8,
              paddingHorizontal: 22,
            }}
            onPress={(): void => setSelectedButton('인기순')}
          >
            <Text
              color={
                selectedButton === '인기순'
                  ? Colors.active
                  : Colors.disabled
              }
            >
              인기순
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            width: '100%',
            backgroundColor: Colors.active,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            padding: 12,
          }}
        >
          <Text color={Colors.wh} bold="400" size={16}>
            적용하기
          </Text>
        </TouchableOpacity>
      </View>
    </BottomModal>
  )
}
