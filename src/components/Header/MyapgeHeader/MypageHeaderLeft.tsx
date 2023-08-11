import React from 'react'
import Text from '@components/Text'
import { Colors } from '@constants'
import { StyleSheet, TouchableOpacity } from 'react-native'
import IconArrowLeft from '@images/svg/IconArrowLeft.svg'
import NavigationService from '@service/NavigationService'
import { IHAblMypageHeader } from '@models/Mypage/MYPAGE'
import { homeLocationState } from '@recoil/atoms/Home/home'
import { useRecoilValue } from 'recoil'
import { View } from 'react-native'

export default function MypageHeaderLeft(
  props: IHAblMypageHeader
): JSX.Element {
  const { userId, isMypage } = props
  const homeLocation = useRecoilValue(homeLocationState)

  return (
    <View style={styles.wrapper}>
      {isMypage ? (
        <Text
          color={Colors.bl}
          bold={'500'}
          size={16}
          lineHeight={18}
        >
          {homeLocation === 'HABL' ? userId : '마이페이지'}
        </Text>
      ) : (
        <>
          <TouchableOpacity
            onPress={(): void => NavigationService.goBack()}
          >
            <IconArrowLeft width={22} height={22} />
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    justifyContent: 'center',
  },
})
