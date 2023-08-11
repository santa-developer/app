import React from 'react'
import Modal from 'react-native-modal'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  homeLocationState,
  isPageModelState,
} from '@recoil/atoms/Home/home'
import { StyleSheet, View } from 'react-native'
import HomeDisabledButton from './HomeDisabledButton'
import HomeActivateButton from './HomeActivateButton'

export default function HomeModal(): JSX.Element {
  const [isPageModal, setIsPageModal] =
    useRecoilState(isPageModelState)
  const setHomeLocation = useRecoilValue(homeLocationState)

  const hideMoreOptions = (): void => {
    setIsPageModal(false)
  }

  const types = ['HABL', 'CHALLENGE', 'NFT', 'SHOP', 'SPACE']

  return (
    <Modal
      isVisible={isPageModal}
      onBackdropPress={hideMoreOptions}
      onBackButtonPress={hideMoreOptions}
    >
      <View style={styles.container}>
        {types.map((type) => {
          return (
            <React.Fragment key={type}>
              {type === setHomeLocation ? (
                <HomeActivateButton type={type} />
              ) : (
                <HomeDisabledButton type={type} />
              )}
            </React.Fragment>
          )
        })}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
