import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native'
import Text from '@components/Text'
import KYCHeader from '@screens/KYC/components/KYCProgress'
import TextInput from '@components/TextInput'
import { Colors } from '@constants'
import Icon from 'react-native-fontawesome-pro'
import _ from 'lodash'
import KYCBankModal from './KYCBankModal'
import NavigationService from '@service/NavigationService'
import Hr from '@components/Hr'
import Body from '@components/Body'
import { KYC_BANK } from '@models/KYC'
import ImageUtils from '@utils/ImageUtils'
import { kyc } from '@api/kyc.api'
import {
  useRecoilState,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import { KYCBank } from '@recoil/atoms/KYC/kyc'
import { useAlert } from '@hooks/useCommonAlert'
import { KYCReload } from '@recoil/atoms/KYC/kyc'
import { isLoadingShowState } from '@recoil/atoms/common'
import $t from 'i18n'
import { BottomButtonOne } from '@components/BottomButton'

export default function KYCAccount(): JSX.Element {
  const [isModal, setIsModal] = useState(false)

  const [, setIsLoading] = useRecoilState(isLoadingShowState)
  const [bankInfo, setBankInfo] = useRecoilState<KYC_BANK>(KYCBank)
  const { bankCode, accountNum, fileMgmtNmbr, bankName } = bankInfo
  const resetBankInfo = useResetRecoilState(KYCBank)

  const setKYCReload = useSetRecoilState(KYCReload)

  const controller = new AbortController()
  const alert = useAlert()

  // 1원 송금
  const postSendBank = async (): Promise<void> => {
    let params

    if (bankInfo) {
      params = {
        bankCode: bankCode,
        accountNum,
      }
    }

    try {
      setIsLoading(true)
      const result = await kyc.sendBank.post({
        params,
        signal: controller.signal,
      })

      if (result.check) {
        setBankInfo({ ...bankInfo, isRemitt: true })
        NavigationService.push('KYCCheckAccount')
      } else {
        alert({ desc: $t(result.messageLocaleCode) })
      }
    } catch (e) {
    } finally {
      setKYCReload(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    resetBankInfo()
  }, [])

  return (
    <>
      <KYCHeader title={'계좌 인증'} step={3} />

      <Hr borderWidth={14} borderColor={Colors.bg1} />

      <Body
        bottomComponent={
          <BottomButtonOne
            text={$t('KYC.KYC_WORD_66')} //'1원 송금'
            // buttonType={bankCode && accountNum ? 'active' : 'enabled'}
            buttonType={'active'}
            onPress={(): void => {
              postSendBank()
              // NavigationService.push('KYCCheckAccount')
            }}
          />
        }
      >
        <View style={styles.textContainer}>
          <Text size={16} bold={'500'} color={Colors.bl}>
            {/* {`계좌 인증을 시작합니다`} */}
            {$t('KYC.KYC_STC_54')}
          </Text>
          <Text size={14} bold={'normal'} color={Colors.nagative}>
            {`1원 송금을 받으실 은행 계좌를 선택하세요.`}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.bankContainer,
            {
              borderColor: _.isEmpty(bankCode)
                ? Colors.disabled
                : Colors.nagative,
            },
          ]}
          onPress={(): void => {
            setIsModal(true)
          }}
        >
          {!_.isEmpty(bankCode) && (
            <Image
              source={ImageUtils.getImageSource({
                type: 'user',
                id: fileMgmtNmbr,
                size: 200,
              })}
              style={{
                width: 40,
                height: 40,
              }}
            />
          )}
          <Text
            color={_.isEmpty(bankName) ? Colors.nagative : Colors.bl}
          >
            {/* `은행 / 증권사 선택` */}
            {_.isEmpty(bankName)
              ? `${$t('KYC.KYC_WORD_64')}`
              : bankName}
          </Text>
          <View style={styles.iconWrapper}>
            <Icon
              name="chevron-down"
              size={10}
              type="light"
              color={
                _.isEmpty(bankName) ? Colors.nagative : Colors.bl
              }
            />
          </View>
        </TouchableOpacity>

        <KYCBankModal
          isModal={isModal}
          setIsModal={setIsModal}
          setBank={setBankInfo}
        />

        {/* 계좌번호 입력 인풋 */}
        <TextInput
          placeholder={$t('KYC.KYC_WORD_65')} // 계좌번호 입력('-' 제외)
          maxLength={30}
          value={accountNum}
          keyboardType={'number-pad'}
          onChangeText={(text): void =>
            setBankInfo({ ...bankInfo, accountNum: text })
          }
          editable={bankCode ? true : false}
        />
      </Body>
    </>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    marginVertical: 30,
  },

  bankContainer: {
    height: 50,
    paddingLeft: 10,
    backgroundColor: Colors.wh,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  iconWrapper: {
    marginLeft: 'auto',
    marginRight: 10,
  },
})
