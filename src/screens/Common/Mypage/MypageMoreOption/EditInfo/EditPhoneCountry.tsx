import React from 'react'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import $t from 'i18n'
import Body from '@components/Body'
import Text from '@components/Text'
import Button from '@components/Button'
import styled from 'styled-components/native'
import { Platform, StyleSheet, View } from 'react-native'
import { CountrySelect } from '@components/CountrySelect'
import { selectedCountryState } from '@recoil/atoms/countryCode'
import { useRecoilValue } from 'recoil'
import NavigationService from '@service/NavigationService'
import { Colors } from '@constants'

export default function EditPhoneCountry(): React.JSX.Element {
  const country = useRecoilValue(selectedCountryState) // 국적
  const { natnCode } = country

  const handleNextBtn = (): void => {
    if (natnCode === 'KR') {
      NavigationService.navigate('EditPhonePass')
    } else {
      NavigationService.navigate('EditPhoneNumForeign')
    }
  }
  return (
    <Body
      bottomComponent={
        <BottomButtonWrapper isAndroid={Platform.OS === 'android'}>
          <Button
            text={$t('COMM.COMM_WORD_NEXT')}
            onPress={(): void => {
              handleNextBtn()
            }}
            buttonType={'active'}
          />
        </BottomButtonWrapper>
      }
    >
      <View style={styles.selectCountryInfo}>
        <Text
          size={18}
          color={Colors.nagative}
          bold={'600'}
          style={{ textAlign: 'center' }}
        >
          변경할 연락처의 {`\n`}
          <Text bold={'500'} size={18}>
            국적
          </Text>
          을 선택해주세요.
        </Text>
      </View>
      <Text size={14} color={Colors.nagative}>
        국가 / 지역
      </Text>
      <View style={styles.selectBoxWrap}>
        <CountrySelect />
      </View>
    </Body>
  )
}

// bottom button component
const BottomButtonWrapper = styled.View<{ isAndroid: boolean }>`
  flex-direction: row;
  justify-content: center;
  padding: ${(props): string => {
    return props.isAndroid ? '15px' : '0 15px'
  }};
`

const styles = StyleSheet.create({
  selectCountryInfo: { alignItems: 'center', marginBottom: 15 },
  selectBoxWrap: {
    flex: 1,
    marginTop: 5,
  },
})

// 헤더
EditPhoneCountry.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('MP.MP_WORD_24'),
  })
}
