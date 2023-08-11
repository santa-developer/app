import { Colors } from '@constants'
import React, { useEffect, useState } from 'react'
import { CardProps } from '../CardModel'
import { Image, StyleSheet } from 'react-native'
import ImageUtils from '@utils/ImageUtils'
import Text from '@components/Text'
import { View } from 'react-native'

export default function CardPost(props: CardProps): JSX.Element {
  const { item } = props

  const [imageCnt, setImageCnt] = useState(1)

  useEffect(() => {
    setImageCnt(1)
  }, [])

  return (
    <View style={styles.wrapper}>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={ImageUtils.getImageSource({
            id: item?.atcmList ? item?.atcmList[0].fileMgmtNmbr : '',
            type: 'feed',
            size: 500,
          })}
        />
      </View>
      {item?.atcmList && (
        <View style={styles.feedPageContainer}>
          <Text
            color={Colors.wh}
          >{`${imageCnt}/${item?.atcmList.length}`}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 320,
  },
  imageView: {
    width: '100%',
    height: 320,
  },
  image: {
    width: '100%',
    height: 312,
  },
  feedPageContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
})
