import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@constants'
import Text from '@components/Text'
import Icon from 'react-native-fontawesome-pro'
//import FastImage from 'react-native-fast-image'
import NoImage from '@images/svg/IconUser.svg'
import NavigationService from '@service/NavigationService'
import { useRecoilValue } from 'recoil'
import { walletSendingHIBS } from '@recoil/atoms/Wallet/wallet'
interface IWalletMemberRecord {
  isMember: string
  id: string
  walletAddress: string
}

/**
 * 송금 화면 회원 목록 표시
 */
export default function WalletMemberRecord({
  isMember,
  id,
  walletAddress,
}: IWalletMemberRecord): JSX.Element {
  const [bAddFavorite, setAddFavorite] = useState(false)
  const sendingHIBS = useRecoilValue(walletSendingHIBS)

  return (
    <Pressable
      onPress={(): void =>
        NavigationService.navigate('WalletTransferConfirm', {
          walletAddress,
          userId: id,
          sendingHIBS,
        })
      }
    >
      <View style={style.container}>
        {isMember ? (
          <View style={style.infoAlign}>
            {/* 프로필 사진 */}
            <View style={style.profile}>
              <NoImage />
            </View>

            <View>
              <Text size={16} bold="500">
                {id}
              </Text>
              <Text size={12} color={Colors.nagative}>
                {walletAddress.substring(0, 30)}
              </Text>
            </View>
          </View>
        ) : (
          <Text size={16} bold="500" style={{ alignSelf: 'center' }}>
            {walletAddress}
          </Text>
        )}
        <TouchableOpacity
          onPress={(): void => setAddFavorite((prev) => !prev)}
        >
          <Icon
            name="star"
            size={20}
            color={bAddFavorite ? Colors.active : Colors.bg1}
          />
        </TouchableOpacity>
      </View>
    </Pressable>
  )
}

const style = StyleSheet.create({
  profile: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: Colors.bg1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 21,
  },
  infoAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
