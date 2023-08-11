import Body from '@components/Body'
import React, { useCallback } from 'react'
import { Alert, View } from 'react-native'
import { RNCamera } from 'react-native-camera'

interface IBarCodeReadEvent {
  type: string
  data: string
}

export default function WalletQRScanner(): JSX.Element {
  const handleBarCodeRead = useCallback(
    ({ data }: IBarCodeReadEvent) => {
      Alert.alert('QR Code Detected', data)
    },
    []
  )

  return (
    <Body>
      <View>
        <RNCamera
          onBarCodeRead={handleBarCodeRead}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        />
      </View>
    </Body>
  )
}
