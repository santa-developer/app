import React, { useEffect, useState } from 'react'
import Text from '@components/Text'
import { Linking, Pressable, StyleSheet, View } from 'react-native'
import Icon from 'react-native-fontawesome-pro'
import IconMoneyTransfer from '@components/Images/wallet/IconOnlineMoneyTransfer'
import Button from '@components/Button'
import { Colors } from '@constants'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import wallet from '@api/wallet.api'
import NavigationService from '@service/NavigationService'
import { MyHIBS } from '@models/Common/Wallet'
import { BigNumber } from 'bignumber.js'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { KYCModal, initKYCInfo } from '@recoil/atoms/KYC/kyc'

export default function WalletMyHIBS(): JSX.Element {
  const [myHIBS, setMyHIBS] = useState<MyHIBS>({
    address: '',
    token: { amount: 0, tokenPrice: 0 },
  })
  const [hipsToWon, setHipsToWon] = useState('')

  // kycPopup
  const setIsKycModal = useSetRecoilState(KYCModal)
  const kycInfo = useRecoilValue(initKYCInfo)

  const handleKycPopup = (props: string): void => {
    if (kycInfo.kycLevel < 5) setIsKycModal(true)
    else if (kycInfo.kycLevel === 5) {
      props === 'send'
        ? NavigationService.navigate('WalletTransfer')
        : null
    }
  }

  //api 호출
  useEffect(() => {
    wallet.myAsset.get().then((data) => {
      const amount =
        Math.floor(
          new BigNumber(data.token.amount)
            .dividedBy(10 ** 18)
            .toNumber() * 100
        ) / 100
      setMyHIBS({ ...data, token: { ...data.token, amount } })
    })
  }, [])

  useEffect(
    () =>
      setHipsToWon(
        (
          myHIBS.token.tokenPrice * myHIBS.token.amount
        ).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      ),
    [myHIBS]
  )

  return (
    <View style={styles.RootContainer}>
      <View style={{ flex: 7, gap: 70 }}>
        <View style={styles.MyHIBS}>
          {/* i18n 적용 예정 */}
          <Text
            bold={'400'}
            size={16}
            color={Colors.wh}
            style={styles.MyHIBSText}
          >
            나의 소중한
          </Text>
          <Text
            bold={'400'}
            size={16}
            color={Colors.wh}
            style={styles.MyHIBSText}
          >
            HIBS를 확인하세요
          </Text>

          <View style={styles.CurrentHIBS}>
            {/* 현재잔액 */}
            <Pressable
              onPress={(): void =>
                NavigationService.navigate('WalletTokenRecord', {
                  hips: myHIBS.token.amount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }),
                  wonTohips: hipsToWon,
                  won: myHIBS.token.tokenPrice,
                })
              }
            >
              <Text bold="500" size={28} color={Colors.wh}>
                {myHIBS.token.amount.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                HIBS
              </Text>
            </Pressable>

            {/* 새로고침 */}
            <Pressable>
              <Icon
                name="arrow-rotate-right"
                color={Colors.wh}
                size={22}
                iconStyle={{ marginLeft: 8 }}
              />
            </Pressable>
          </View>

          {/* HIBS <-> 한화 */}
          <View style={styles.ExchangeDisplayView}>
            <Text bold={'400'} size={16} color={Colors.wh}>
              {hipsToWon}원
            </Text>
            <Text size={16} color={Colors.wh} bold={'400'}>
              (1HIBS = {myHIBS.token.tokenPrice}원 )
            </Text>
          </View>
        </View>

        {/* onPress 함수 추가 예정 */}
        <View style={styles.GetAndSendButtons}>
          <Button
            text="받기"
            buttonType="active"
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onPress={(): void => {
              handleKycPopup('get')
            }}
            buttonStyle={{ width: 167 }}
          />
          <Button
            text="보내기"
            onPress={(): void => {
              handleKycPopup('send')
            }}
            buttonStyle={{ width: 167 }}
          />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <HowToDealButton />
      </View>
    </View>
  )
}

/**
 * HIBS 거래방법 버튼
 * @returns {React.JSX.Element}
 */
const HowToDealButton = (): React.JSX.Element => {
  const url = 'https://blog.naver.com/teamhiblocks/222124295829'

  const handlePress = async (): Promise<void> => {
    const canOpenURL = await Linking.canOpenURL(url)
    if (canOpenURL) await Linking.openURL(url)
  }

  return (
    <Pressable
      style={styles.HowToDealButtonContainer}
      onPress={handlePress}
    >
      <View style={styles.MoneyTransferIcon}>
        <IconMoneyTransfer width={128} height={116} />
      </View>

      <View style={{ marginLeft: 100 }}>
        <Text bold={'500'} size={16}>
          HIBS 거래방법
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Text bold={'400'} size={12} color={Colors.nagative}>
            더 알아보기
          </Text>
          <Icon
            name="chevron-right"
            size={10}
            color={Colors.nagative}
          />
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  RootContainer: {
    backgroundColor: Colors.wh,
    height: '100%',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingHorizontal: 5,
  },
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
    position: 'absolute',
    left: '14%',
    right: '9%',
    top: '-43%',
    bottom: '15.26%',
  },
  MyHIBS: {
    backgroundColor: Colors.active,
    paddingTop: 30,
    paddingRight: 60,
    paddingBottom: 35,
    paddingLeft: 23,
    justifyContent: 'center',
    borderRadius: 10,
  },
  CurrentHIBS: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 27,
  },
  MyHIBSText: {
    lineHeight: 20,
    alignItems: 'center',
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

WalletMyHIBS.navigationOptions = (): StackNavigationOptions =>
  CommonHeader({
    title: '지갑',
  })
