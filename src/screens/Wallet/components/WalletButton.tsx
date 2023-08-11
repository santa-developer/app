import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from '@components/Text'
import { StyledFontFamily } from '@components/Text/TextStyles'
import { Colors } from '@constants'

interface IWalletButtonProps {
  text: string
  onPress?: () => void
}

/**
 * 지갑 화면에서 자주 쓰이는 하단 버튼
 */
export default function WalletButton({
  text,
  onPress,
}: IWalletButtonProps): JSX.Element {
  return (
    <View style={{ paddingHorizontal: 15 }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: Colors.active,
          width: '100%',
          paddingVertical: 16,
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          bold="500"
          color={Colors.wh}
          size={16}
          style={{
            lineHeight: 20,
            fontFamily: StyledFontFamily('bold'),
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
