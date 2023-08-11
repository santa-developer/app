import React, { useEffect, useState } from 'react'
import Text from '@components/Text'
import {
  Linking,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-fontawesome-pro'
import Button from '@components/Button'
import { Colors } from '@constants'
import IconMoneyWallet from '@components/Images/Icon/IconMoneyWallet'
import wallet from '@api/wallet.api'
import { MyStaking } from '@models/Common/Wallet'
import { BigNumber } from 'bignumber.js'
import NavigationService from '@service/NavigationService'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { KYCModal, initKYCInfo } from '@recoil/atoms/KYC/kyc'

export default function WalletMyStaking(): JSX.Element {
  const [myStaking, setMyStaking] = useState<MyStaking>({
    address: '',
    tokenPrice: 0,
    amount: 0,
    memberId: '',
  })

  // kycPopup
  const setIsKycModal = useSetRecoilState(KYCModal)
  const kycInfo = useRecoilValue(initKYCInfo)

  const handleKycPopup = (): void => {
    if (kycInfo.kycLevel < 5) setIsKycModal(true)
    else if (kycInfo.kycLevel === 5) {
      NavigationService.navigate('WalletStakingTransfer', {
        stakingAmount: myStaking.amount,
      })
    }
  }
  useEffect(() => {
    wallet.myStaking.get().then((data): void => {
      const amount =
        Math.floor(
          new BigNumber(data.amount).dividedBy(10 ** 18).toNumber() *
            100
        ) / 100
      setMyStaking({ ...data, amount })
    })
  }, [])

  return (
    <View
      style={{
        paddingTop: 15,
        paddingHorizontal: 5,
        backgroundColor: Colors.wh,
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flex: 7, gap: 70 }}>
        <View style={styles.MyStaking}>
          {/* i18n 적용 예정 */}
          <Text
            bold={'400'}
            size={16}
            color={Colors.wh}
            style={styles.MyHIBSText}
          >
            스테이킹을 통해
          </Text>
          <Text
            bold={'400'}
            size={16}
            color={Colors.wh}
            style={styles.MyHIBSText}
          >
            HIBS를 모아보세요
          </Text>

          <View style={styles.CurrentHIBS}>
            <TouchableOpacity
              onPress={(): void =>
                NavigationService.navigate('WalletStakingRecord')
              }
            >
              <Text bold="500" size={28} color={Colors.wh}>
                {myStaking.amount} HIBS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="arrow-rotate-right"
                color={Colors.wh}
                size={22}
                iconStyle={{ marginLeft: 12 }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.ExchangeDisplayView}>
            <Text bold={'400'} size={16} color={Colors.wh}>
              {myStaking.tokenPrice * myStaking.amount}원
            </Text>
            <Text size={16} color={Colors.wh} bold={'400'}>
              (1HIBS = {myStaking.tokenPrice}원 )
            </Text>
          </View>
        </View>

        {/* onPress 함수 추가 예정 */}
        <View style={styles.GetAndSendButtons}>
          <Button
            text="스테이킹"
            buttonType="active"
            onPress={handleKycPopup}
            buttonStyle={{ width: 167 }}
          />
          <Button
            text="언스테이킹"
            onPress={(): void =>
              NavigationService.navigate('WalletUnstakingTransfer', {
                stakingAmount: myStaking.amount,
              })
            }
            buttonStyle={{ width: 167 }}
          />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <HowToStakingButton />
      </View>
    </View>
  )
}

/**
 * HIBS 스테이킹 버튼
 * @returns {React.JSX.Element}
 */
function HowToStakingButton(): React.JSX.Element {
  const url = 'https://blog.naver.com/teamhiblocks/222089000925'

  const handlePress = async (): Promise<void> => {
    const canOpenURL = await Linking.canOpenURL(url)
    if (canOpenURL) await Linking.openURL(url)
  }

  return (
    <Pressable
      style={styles.HowToDealButtonContainer}
      onPress={handlePress}
    >
      <View>
        <Text bold={'500'} size={16}>
          HIBS 스테이킹
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Text bold={'400'} size={12} color={Colors.nagative}>
            자세히 알아보기
          </Text>
          <Icon
            name="chevron-right"
            size={10}
            color={Colors.nagative}
          />
        </View>
      </View>
      <View style={styles.MoneyTransferIcon}>
        <IconMoneyWallet />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  HowToDealButtonContainer: {
    backgroundColor: Colors.bg2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: '100%',
    width: '100%',
  },
  MoneyTransferIcon: {
    left: '18%',
    bottom: '7.5%',
  },
  MyStaking: {
    backgroundColor: Colors.active,
    paddingTop: 30,
    paddingRight: 60,
    paddingBottom: 35,
    paddingLeft: 23,
    justifyContent: 'center',
    borderRadius: 10,
  },
  MyHIBSText: {
    lineHeight: 20,
    alignItems: 'center',
  },
  CurrentHIBS: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 27,
  },
  ExchangeDisplayView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 6,
  },
  GetAndSendButtons: {
    flexDirection: 'row',
    gap: 11,
    justifyContent: 'space-around',
  },
})
