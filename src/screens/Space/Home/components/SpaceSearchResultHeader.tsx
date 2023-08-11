import { TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Text from '@components/Text'
import { Colors } from '@constants'
import IconSort from '@images/svg/IconSort.svg'
import SpaceFeedFilter from './SpaceFeedFilter'
import { useRecoilValue } from 'recoil'
import {
  selectedSpaceCategoryInfo,
  spaceSearchLocationState,
} from '@recoil/atoms/Space/space'
import SpaceCommonFilter from './SpaceCommonFilter'

/**
 * 스페이스 검색시 필터 및 검색 갯수
 */

export default function SpaceSearchResultHeader(): JSX.Element {
  const currentSpaceLocation = useRecoilValue(
    spaceSearchLocationState
  )
  const selectedCategoryInfo = useRecoilValue(
    selectedSpaceCategoryInfo
  )
  const [isBottomModal, setIsBottomModal] = useState(false)
  const [selectedButton, setSelectedButton] = useState('최신순')

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
      }}
    >
      <Text color={Colors.nagative} size={12} bold="400">
        {`전체 ${selectedCategoryInfo.count}개`}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          gap: 5,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}
          onPress={(): void => setIsBottomModal(true)}
        >
          <IconSort />
          <Text color={Colors.nagative} size={12} bold="400">
            최신순
          </Text>
        </TouchableOpacity>
      </View>
      {currentSpaceLocation === 'spaceFeed' ? (
        <SpaceFeedFilter
          isBottomModal={isBottomModal}
          setIsBottomModal={setIsBottomModal}
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
      ) : (
        <SpaceCommonFilter
          isBottomModal={isBottomModal}
          setIsBottomModal={setIsBottomModal}
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
      )}
    </View>
  )
}
