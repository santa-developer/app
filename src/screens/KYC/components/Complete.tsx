import React from 'react'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Body from '@components/Body'
import Text from '@components/Text'
import { Colors, Images } from '@constants'
import { BottomButtonOne } from '@components/BottomButton'

interface CompleteProps {
  title: string
  desc?: string
  btnText: string
  onPress: () => void
}
export default function Complete(props: CompleteProps): JSX.Element {
  return (
    <Body
      bottomComponent={
        <BottomButtonOne
          text={props.btnText}
          buttonType={'active'}
          onPress={props.onPress}
        />
      }
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <FastImage
            style={styles.iconImg}
            source={Images.gif.faceIdLock}
          />
          <Text size={20} bold={'500'} color={Colors.bl}>
            {props.title}
          </Text>
          {props.desc && (
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ textAlign: 'center', marginTop: 10 }}
            >
              {props.desc}
            </Text>
          )}
        </View>
      </View>
    </Body>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
  },

  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 53,
    marginBottom: 200,
  },

  iconImg: {
    width: 290,
    height: 303,
    margin: 19,
  },
})
