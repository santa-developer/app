import React from 'react'
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native'
import { Colors } from '@constants'
import Yuri from '@images/testImg/yuri.jpeg'
import Text from '@components/Text'
import NavigationService from '@service/NavigationService'
import { useSetRecoilState } from 'recoil'
import { selectedSpaceCategoryInfo } from '@recoil/atoms/Space/space'

interface ISpaceCategory {
  title: string
  count: number
  categoryID: string
}

export default function SpaceCategoryMember({
  title,
  count,
  categoryID,
}: ISpaceCategory): JSX.Element {
  const setSelectedCategoryInfo = useSetRecoilState(
    selectedSpaceCategoryInfo
  )

  return (
    <Pressable
      style={styles.categoryMember}
      onPress={(): void => {
        setSelectedCategoryInfo({ title, count, categoryID })
        NavigationService.navigate('SpaceCategoryResult')
      }}
    >
      <ImageBackground
        style={styles.background}
        source={Yuri}
        resizeMode="cover"
      >
        <View style={styles.textContainer}>
          <Text color={Colors.wh} bold="600" size={10}>
            {title}
          </Text>
          <Text color={Colors.wh} bold="500" size={14}>
            {count}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  categoryMember: {
    width: '23%',
    aspectRatio: 0.85,
  },
  textContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.bl,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
