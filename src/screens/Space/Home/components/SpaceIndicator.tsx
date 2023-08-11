import React from 'react'
import { Colors } from '@constants'
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import Text from '@components/Text'
import { useRecoilState } from 'recoil'
import { spaceLocationState } from '@recoil/atoms/Space/space'
import { RecommendSpace } from '@models/Common/SPACE'
import { StyleProp } from 'react-native'
spaceLocationState

interface ISpaceindicator {
  data: RecommendSpace[]
}

/**
 * Space 홈화면의 추천/팔로잉/운영 화면
 */
export default function SpaceIndicator({
  data,
}: ISpaceindicator): JSX.Element {
  const [spaceScreen, setSpaceScreen] = useRecoilState(
    spaceLocationState
  )

  const { width } = Dimensions.get('window')
  const ITEM_WIDTH = width / 4

  const renderedItem = ({
    item,
  }: {
    item: RecommendSpace
  }): JSX.Element => (
    <View style={{ alignItems: 'center' }}>
      <View style={dynamicStyles({ itemWidth: ITEM_WIDTH })} />
      <Text style={{ flex: 0.1 }}>{item.hispName}</Text>
    </View>
  )

  const showNothing = (): JSX.Element => {
    if (spaceScreen === 'follow')
      return (
        <Nothing
          current={spaceScreen}
          content1="팔로우중인 스페이스가 없습니다."
          content2="스페이스를 팔로우 해보세요"
        />
      )

    return (
      <Nothing
        current={spaceScreen}
        content1="운영중인 스페이스가 없습니다."
        content2="나만의 스페이스를 개설해 보세요"
      />
    )
  }
  return (
    <View style={styles.SpaceBannerContainer}>
      <View style={styles.SpaceSwitchButtonContainer}>
        {/* 추천 */}
        <Pressable
          style={{
            ...styles.SpaceSwitchButton,
            backgroundColor:
              spaceScreen === 'recommend' ? Colors.bl : Colors.wh,
          }}
          onPress={(): void => setSpaceScreen('recommend')}
        >
          <Text
            color={
              spaceScreen === 'recommend' ? Colors.wh : Colors.bl
            }
          >
            추천
          </Text>
        </Pressable>

        {/* 팔로잉 */}
        <Pressable
          style={{
            ...styles.SpaceSwitchButton,
            backgroundColor:
              spaceScreen === 'follow' ? Colors.bl : Colors.wh,
          }}
          onPress={(): void => setSpaceScreen('follow')}
        >
          <Text
            color={spaceScreen === 'follow' ? Colors.wh : Colors.bl}
          >
            팔로잉
          </Text>
        </Pressable>

        {/* 운영중 */}
        <Pressable
          style={{
            ...styles.SpaceSwitchButton,
            backgroundColor:
              spaceScreen === 'owner' ? Colors.bl : Colors.wh,
          }}
          onPress={(): void => setSpaceScreen('owner')}
        >
          <Text
            color={spaceScreen === 'owner' ? Colors.wh : Colors.bl}
          >
            운영중
          </Text>
        </Pressable>
      </View>

      {/* 스페이스 목록 */}
      {data.length !== 0 ? (
        <FlatList
          data={data}
          horizontal
          pagingEnabled
          snapToInterval={width}
          decelerationRate="fast"
          renderItem={renderedItem}
          contentContainerStyle={{
            gap: 5,
            paddingVertical: 10,
            paddingHorizontal: 5,
          }}
          keyExtractor={(item): string => item.hispId}
        />
      ) : (
        showNothing()
      )}
    </View>
  )
}

const Nothing = ({
  current,
  content1,
  content2,
}: {
  current: string
  content1: string
  content2: string
}): JSX.Element => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }}
  >
    <Text size={14} bold="400">
      {content1}
    </Text>
    <Text size={14} bold="400">
      {content2}
    </Text>
    {current === 'owner' && (
      <Text
        color={Colors.disabled}
        size={12}
        bold="400"
      >{`(*스페이스 개설: 업로드 > 스페이스 개설)`}</Text>
    )}
  </View>
)

interface Iprop {
  itemWidth: number
}
const dynamicStyles = ({
  itemWidth,
}: Iprop): StyleProp<ViewStyle> => ({
  width: itemWidth,
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.active,
  paddingHorizontal: 5,
  flex: 0.99,
})

const styles = StyleSheet.create({
  SpaceSwitchButtonContainer: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },

  SpaceSwitchButton: {
    borderWidth: 2,
    borderRadius: 9,
    width: 'auto',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  SpaceBannerContainer: {
    backgroundColor: Colors.wh,
    height: 260,
    paddingTop: 5,
  },
})
