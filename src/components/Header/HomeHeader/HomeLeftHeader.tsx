import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  homeLocationState,
  isPageModelState,
} from '@recoil/atoms/Home/home'
import HablSelectLogo from '@images/svg/HablSelectLogo.svg'
import SpaceSelectLogo from '@images/svg/SpaceSelectLogo.svg'
import IconChevron from '@images/svg/IconChevron.svg'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
// import { Images } from '@constants'

export default function HomeLeftHeader(): JSX.Element {
  const setIsPageModal = useSetRecoilState(isPageModelState)
  const homeLocation = useRecoilValue(homeLocationState)

  const handlePress = (): void => {
    setIsPageModal(true)
  }

  return (
    <View style={styles.headerWrap}>
      <TouchableOpacity
        style={styles.headerIconContainer}
        activeOpacity={0.7}
        onPress={handlePress}
      >
        {homeLocation === 'HABL' ? (
          <HablSelectLogo />
        ) : (
          <SpaceSelectLogo />
        )}
        <IconChevron style={{ marginLeft: 5 }} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  headerWrap: {
    padding: 20,
    justifyContent: 'center',
  },
  headerIconContainer: {
    flexDirection: 'row',
  },
})
