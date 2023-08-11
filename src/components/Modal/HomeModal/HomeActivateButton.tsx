import Text from '@components/Text'
import { Colors } from '@constants'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

// 선택된 페이지 타입
export default function HomeActivateButton({
  type,
}: {
  type: string
}): JSX.Element {
  return (
    <View style={styles.pageWrap}>
      <LinearGradient
        style={styles.pageBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[Colors.logo2, Colors.logo1]}
      >
        <Text color={Colors.wh} size={24} bold={'500'}>
          {type}
        </Text>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  pageWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  pageBackground: {
    borderRadius: 50,
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
})
