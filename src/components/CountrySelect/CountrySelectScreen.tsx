import memberApi from '@api/member.api'
import Text from '@components/Text'
import { Colors } from '@constants'
import { NATN_CODE } from '@models/Common/NATN_CODE'
import {
  countryCodeListState,
  selectedCountryState,
} from '@recoil/atoms/countryCode'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Keyboard, View } from 'react-native'
import Icon from 'react-native-fontawesome-pro'
import { useRecoilState } from 'recoil'
import styled from 'styled-components/native'
import CountrySelectListModal from './CountrySelectListModal'
import { CountrySelectProps } from './CountrySelectModel'

/**
 * 국가코드 선택 selectbox
 * @param props
 * @returns
 */
export default function CountrySelectScreen(
  props: CountrySelectProps
): React.JSX.Element {
  const { disabled = false, selectBoxWidth = 'auto' } = props

  // 선택 국가
  const [selectedCountry, setSelectedCountryState] = useRecoilState(
    selectedCountryState
  )
  // 국가 리스트
  const [countryCodeList, setCountryCodeList] = useRecoilState(
    countryCodeListState
  )
  // 모달 스크롤 index
  // const [initialScrollIndex, setInitialScrollIndex] =
  //   useState<number>()
  const [isShowModal, setIsShowModal] = useState(false)

  // 국가 리스트 api
  const _getCountryCodeList = async (): Promise<void> => {
    const result = await memberApi.member.natnproc.get()
    if (result.check) {
      const newCountryCodeList = result.response
        .slice()
        .sort((a: NATN_CODE, b: NATN_CODE) => {
          if (a.codeName < b.codeName) {
            return -1
          }
          if (a.codeName > b.codeName) {
            return 1
          }
          return 0
        })
      setCountryCodeList(newCountryCodeList)
    }
  }

  const openModal = (): void => setIsShowModal(true)
  const closeModal = (): void => setIsShowModal(false)

  const onPressCountry = (country: NATN_CODE): void => {
    setSelectedCountryState(country)
    closeModal()
  }

  useEffect(() => {
    if (_.isEmpty(countryCodeList)) {
      _getCountryCodeList()
    }
  }, [])

  // seletedCountry 위치로 스크롤(잘안됨 ㅜ 추후 기능 추가)
  // useEffect(() => {
  //   !_.isEmpty(countryCodeList)
  //     ? setInitialScrollIndex(
  //         countryCodeList.findIndex(
  //           (item) => item.natnCode === selectedCountry.natnCode
  //         )
  //       )
  //     : ''
  // }, [countryCodeList])

  return (
    <View style={{ width: selectBoxWidth }}>
      <SelectButton
        disabled={disabled}
        isEmpty={_.isEmpty(selectedCountry)}
        onPress={(): void => {
          Keyboard.dismiss()
          openModal()
        }}
      >
        <Text
          color={
            _.isEmpty(selectedCountry) ? Colors.nagative : Colors.bl
          }
        >
          {selectedCountry.natnCode}
        </Text>
        <IconWrapper>
          <Icon
            name="chevron-down"
            size={10}
            type="light"
            color={
              _.isEmpty(selectedCountry) ? Colors.nagative : Colors.bl
            }
          />
        </IconWrapper>
      </SelectButton>

      {/* 모달 */}
      <CountrySelectListModal
        isShowModal={isShowModal}
        countryCodeList={countryCodeList}
        selectedCountry={selectedCountry}
        // initialScrollIndex={initialScrollIndex}
        onCoutnryPress={onPressCountry}
        closeModal={closeModal}
      />
    </View>
  )
}

const SelectButton = styled.TouchableOpacity<{ isEmpty?: boolean }>`
  height: 50px;
  padding-left: 10px;
  background-color: ${Colors.wh};
  border-radius: 5px;
  flex-direction: row;
  border-width: 1px;
  align-items: center;
  border-color: ${(props): string =>
    props.isEmpty ? Colors.disabled : Colors.nagative};
  color: ${(props): string =>
    props.isEmpty ? Colors.nagative : Colors.bl};
`
const IconWrapper = styled.View`
  margin-left: auto;
  margin-right: 10px;
`
