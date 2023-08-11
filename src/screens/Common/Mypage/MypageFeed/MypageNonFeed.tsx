import Text from '@components/Text'
import { Colors } from '@constants'
import { headerHeightState } from '@recoil/atoms/Mypage/mypage'
import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import { useRecoilValue } from 'recoil'

export default function NonContents({
  mebrMgmtNmbr,
}: {
  mebrMgmtNmbr: string
}): JSX.Element {
  const headerHeight = useRecoilValue(headerHeightState)

  const styles = StyleSheet.create({
    wrap: {
      width: '100%',
      height: '100%',
      backgroundColor: Colors.gr,
      alignItems: 'center',
    },
    text: {
      marginTop: (headerHeight?.[mebrMgmtNmbr] || 0) + 50,
    },
  })

  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{'게시물이 없습니다. 🙁'}</Text>
    </View>
  )
}
