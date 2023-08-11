import { Colors, Layout } from '@constants'
import BLTB from '@models/Common/BLTB'
import NavigationService from '@service/NavigationService'
import ImageUtils from '@utils/ImageUtils'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'

export default function MypageItem({
  index,
  item,
}: {
  index: number
  item?: BLTB
}): JSX.Element {
  const styles = StyleSheet.create({
    contents: {
      borderRightWidth: index % 3 === 1 ? 1 : 0,
      borderLeftWidth: index % 3 === 1 ? 1 : 0,
      borderColor: Colors.wh,
    },
    image: {
      width: Layout.window.width / 3,
      height: Layout.window.width / 3,
    },
  })

  return (
    <TouchableOpacity
      key={index}
      style={styles.contents}
      activeOpacity={0.6}
      onPress={(): void => {
        NavigationService.navigate('MypageHome')
      }}
    >
      <Image
        style={styles.image}
        source={ImageUtils.getImageSource({
          id: item?.bltbThnl,
          type: 'feed',
          size: 550,
        })}
      />
    </TouchableOpacity>
  )
}
