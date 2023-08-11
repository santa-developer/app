import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Text from '@components/Text'
import { Colors } from '@constants'
import { useSetRecoilState } from 'recoil'
import {
  homeLocationState,
  isPageModelState,
} from '@recoil/atoms/Home/home'

// 선택되지 않은 페이지 타입
export default function HomeDisabledButton({
  type,
}: {
  type: string
}): JSX.Element {
  const setHomeLocation = useSetRecoilState(homeLocationState)
  const setIsPageModel = useSetRecoilState(isPageModelState)

  const handlePress = (): void => {
    if (type === 'HABL' || type === 'SPACE') {
      setIsPageModel(false)
      setHomeLocation(type)
    }
  }

  return (
    <TouchableOpacity style={styles.pageWrap} onPress={handlePress}>
      <Text color={Colors.wh} size={24} bold={'500'}>
        {type}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  pageWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
})
