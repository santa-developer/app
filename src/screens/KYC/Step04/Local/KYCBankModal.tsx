import React, { useEffect } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import { Colors, Layout } from '@constants'
import Text from '@components/Text'
import { KYC_BANK, KYC_MODAL_TYPE } from '@models/KYC'
import BottomModal from '@components/BottomModal'
import ImageUtils from '@utils/ImageUtils'
import { SetterOrUpdater, useRecoilState } from 'recoil'
import { KYCBankList } from '@recoil/atoms/KYC/kyc'
import _ from 'lodash'
import { useAlert } from '@hooks/useCommonAlert'
import { kyc } from '@api/kyc.api'

export default function KYCBankModal({
  isModal,
  setIsModal,
  setBank,
}: KYC_MODAL_TYPE & {
  setBank: SetterOrUpdater<KYC_BANK>
}): JSX.Element {
  const [banks, setBanks] = useRecoilState<KYC_BANK[]>(KYCBankList)

  const alert = useAlert()

  const renderBankList = ({
    item,
  }: {
    item: KYC_BANK
  }): JSX.Element => {
    const { bankName } = item
    return (
      <TouchableOpacity
        style={styles.bankItem}
        onPress={(): void => {
          setBank(item)
          setIsModal(false)
        }}
      >
        <View
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            source={ImageUtils.getImageSource({
              type: 'user',
              id: item.fileMgmtNmbr,
              size: 200,
            })}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </View>
        <Text
          size={14}
          bold={'normal'}
          color={Colors.bl}
          style={{ lineHeight: 20 }}
        >
          {bankName}
        </Text>
      </TouchableOpacity>
    )
  }

  const getInit = async (): Promise<void> => {
    try {
      if (_.isEmpty(banks)) {
        const result = await kyc.bankList.get()
        if (result.check && result.response) {
          const { list: bankList } = result.response
          // KYC 은행 목록
          setBanks(bankList)
        } else {
          alert({ desc: result.message })
        }
      }
    } catch (e) {
    } finally {
    }
  }

  useEffect(() => {
    getInit()
  }, [])

  return (
    <BottomModal
      isVisible={isModal}
      onBackdropPress={(): void => setIsModal(false)}
      modalHeight={'80%'}
    >
      <Text
        size={16}
        bold={`500`}
        color={Colors.bl}
        style={{ marginTop: 18, marginBottom: 23 }}
      >{`은행을 선택해주세요`}</Text>

      <View style={styles.bankList}>
        {banks && (
          <FlatList
            numColumns={3}
            data={banks}
            columnWrapperStyle={{ columnGap: 10 }}
            renderItem={renderBankList}
            keyExtractor={(item, idx): string => idx.toString()}
          />
        )}
      </View>
    </BottomModal>
  )
}

const styles = StyleSheet.create({
  bankList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Layout.bodyWidth / 3 - 3.5,
    height: 75,
    backgroundColor: Colors.gr,
    overflow: 'hidden',
    marginVertical: 5,
    borderRadius: 4,
  },
})
