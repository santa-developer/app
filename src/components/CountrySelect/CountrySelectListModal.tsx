import BottomModal from '@components/BottomModal'
import Text from '@components/Text'
import { Colors } from '@constants'
import { NATN_CODE } from '@models/Common/NATN_CODE'
import $t from 'i18n'
import React from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'
import { CountrySelectListModalProps } from './CountrySelectModel'
import _ from 'lodash'

export default function CountrySelectListModal(
  props: CountrySelectListModalProps
): React.JSX.Element {
  const {
    isShowModal,
    countryCodeList,
    selectedCountry,
    // initialScrollIndex = 0,
    onCoutnryPress,
    closeModal,
  } = props

  const MODAL_HEIGTH = '90%'

  const CountryItem = ({
    item,
  }: {
    item: NATN_CODE
  }): React.JSX.Element => {
    const isSelectedCountry =
      item.natnCode === selectedCountry.natnCode
    return (
      <CountryItemWrap
        isSelectedCountry={isSelectedCountry}
        onPress={(): void => onCoutnryPress(item)}
      >
        <Text>
          {item.uniCode}
          {'\t'}
          {$t(`NATN.${item.msgCode}`)}
        </Text>
      </CountryItemWrap>
    )
  }

  return (
    <BottomModal
      modalHeight={MODAL_HEIGTH}
      isVisible={isShowModal}
      isBackDrop={true}
      onBackdropPress={closeModal}
    >
      <ScrollView style={{ width: '100%' }}>
        {_.map(countryCodeList, (item, idx) => (
          <CountryItem item={item} key={idx} />
        ))}
      </ScrollView>
    </BottomModal>
  )
}

const CountryItemWrap = styled.TouchableOpacity<{
  isSelectedCountry: boolean
}>`
  width: 100%;
  flex-direction: row;
  padding: 10px 5px;
  background-color: ${({ isSelectedCountry }): string =>
    isSelectedCountry ? Colors.bg1 : Colors.wh};
`
