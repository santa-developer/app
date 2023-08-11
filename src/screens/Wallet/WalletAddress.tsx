import React from 'react'
import TextInput from '@components/TextInput'
import { StyledFontFamily } from '@components/Text/TextStyles'
import { View } from 'react-native'
import { Colors } from '@constants'
import { useSetRecoilState } from 'recoil'
import {
  walletAddressInputValue,
  walletTransferButtonChange,
} from '@recoil/atoms/Wallet/wallet'

export default function WalletAddress(): JSX.Element {
  const setWalletButtonChangeFlag = useSetRecoilState(
    walletTransferButtonChange
  )
  const setWalletAddressValue = useSetRecoilState(
    walletAddressInputValue
  )

  return (
    <View
      style={{
        backgroundColor: Colors.wh,
        height: '100%',
        paddingTop: 20,
        paddingHorizontal: 10,
      }}
    >
      <TextInput
        placeholder="받는 분 지갑주소 입력"
        placeholderTextColor={Colors.nagative}
        onChange={(e): void =>
          setWalletAddressValue(e.nativeEvent.text)
        }
        style={{
          width: 345,
          height: 48,
          color: Colors.nagative,
          fontFamily: StyledFontFamily('bold'),
          fontSize: 14,
          fontWeight: '400',
        }}
        onFocus={(): void => setWalletButtonChangeFlag(true)}
        onBlur={(): void => setWalletButtonChangeFlag(false)}
      />
    </View>
  )
}
