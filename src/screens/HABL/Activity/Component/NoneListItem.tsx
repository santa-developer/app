import React from 'react'
import Text from '@components/Text'
import { Image, StyleSheet, View } from 'react-native'
import { Colors, Images } from '@constants'

export default function NoneListItem(): React.JSX.Element {
  return (
    <View>
      <View style={styles.imageWrap}>
        <Image
          source={Images.gif.noMessage}
          style={styles.noneHunterList}
        />
      </View>
      <Text color={Colors.nagative} style={{ textAlign: 'center' }}>
        활동내역이 없습니다. 😐
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  imageWrap: {
    width: '100%',
  },
  noneHunterList: {
    objectFit: 'contain',
    width: '100%',
    height: 350,
    margin: 'auto',
  },
})
