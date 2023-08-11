import DefaultHeaderCenter from '@components/Header/CommonHeader/DefaultHeaderCenter'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-fontawesome-pro'

const AgreementHeader = ({
  title,
  setIsModal,
}: {
  title: string
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  return (
    <View
      style={{
        position: 'relative',
        height: 55,
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <View style={{ flex: 1 }}>
        <DefaultHeaderCenter title={title} />
      </View>
      <TouchableOpacity
        style={{
          padding: 20,
          position: 'absolute',
          right: 0,
        }}
        onPress={(): void => {
          setIsModal(false)
        }}
      >
        <Icon name={'xmark'} type="light" size={16} />
      </TouchableOpacity>
    </View>
  )
}

export default AgreementHeader
