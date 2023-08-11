import Body from '@components/Body'
import Text from '@components/Text'
import { Colors } from '@constants'
import IconBan from '@images/svg/IconBan.svg'
import IconColorLock from '@images/svg/IconColorLock.svg'
import IconDatabase from '@images/svg/IconDatabase.svg'
import IconExit from '@images/svg/IconExit.svg'
import IconInformation from '@images/svg/IconInformation.svg'
import IconNotification from '@images/svg/IconNotification.svg'
import IconQuestion from '@images/svg/IconQuestion.svg'
import NavigationService from '@service/NavigationService'
import $t from 'i18n'
import React, { useState } from 'react'
import { Linking, Platform } from 'react-native'
import Icon from 'react-native-fontawesome-pro'
import styled from 'styled-components/native'
import AgreementModal from '../../../../Agreement'

function MypageSettingScreen(): React.JSX.Element {
  const [isShowDropDown, setIsShowDropDown] = useState(false)
  const [isTerms, setIsTerms] = useState(false)
  const [isPrivacy, setIsPrivacy] = useState(false)

  const IconChevron = (): React.JSX.Element => (
    <Icon
      name={`chevron-${isShowDropDown ? 'up' : 'down'}`}
      type="light"
      color={Colors.nagative}
      size={15}
    />
  )

  return (
    <Body scrollable hidePadding>
      {/* 고객지원 */}
      <SettingList
        onPress={(): void => setIsShowDropDown((prev) => !prev)}
      >
        <FlexRowCenter>
          <IconInformation />
          <ListTitle>{$t('MP.MP_WORD_31')}</ListTitle>
        </FlexRowCenter>
        <IconChevron />
      </SettingList>

      {/* 고객지원 drop down */}
      <DropDownWrap isShowDropDown={isShowDropDown}>
        {/* 메일문의 */}
        <DropDownList
          onPress={(): void =>
            NavigationService.navigate('MailInquiries')
          }
        >
          <DropDownListTitle>
            {$t('COMM.COMM_WORD_34')}
          </DropDownListTitle>
        </DropDownList>
        {/* 공지사항 */}
        <DropDownList
          onPress={(): void => NavigationService.navigate('Notice')}
        >
          <DropDownListTitle>
            {$t('COMM.COMM_WORD_NOTICE')}
          </DropDownListTitle>
        </DropDownList>
        {/* FAQ */}
        <DropDownList
          onPress={(): void => NavigationService.navigate('Faq')}
        >
          <DropDownListTitle>FAQ</DropDownListTitle>
        </DropDownList>
        {/* 이용약관 */}
        <DropDownList
          onPress={(): void => {
            setIsTerms(true)
            // Linking.openURL('https://hiblocks.io/terms')
          }}
        >
          <DropDownListTitle>
            {$t('USER.USER_WORD_16')}
          </DropDownListTitle>
        </DropDownList>
        {/* 개인정보처리방침 */}
        <DropDownList
          onPress={(): void => {
            setIsPrivacy(true)
          }}
        >
          <DropDownListTitle>
            {$t('USER.USER_WORD_08')}
          </DropDownListTitle>
        </DropDownList>
        {/* 회사소개 */}
        <DropDownList
          onPress={(): void => {
            Linking.openURL('https://www.hiblocks.io/')
          }}
        >
          <DropDownListTitle>{$t('MP.MP_WORD_29')}</DropDownListTitle>
        </DropDownList>
      </DropDownWrap>

      {/* 보안/인증 */}
      <SettingList
        onPress={(): void =>
          NavigationService.navigate('Verfication')
        }
      >
        <FlexRowCenter>
          <IconColorLock />
          <ListTitle>{$t('WALT.WALT_WORD_30')}</ListTitle>
        </FlexRowCenter>
      </SettingList>
      {/* 알림 설정 */}
      <SettingList
        onPress={(): void =>
          NavigationService.navigate('NotificationSetting')
        }
      >
        <FlexRowCenter>
          <IconNotification />
          <ListTitle>
            {$t('COMM.COMM_WORD_ALERT')} {$t('MP.MP_WORD_20')}
          </ListTitle>
        </FlexRowCenter>
      </SettingList>
      {/* 차단 계정 관리 */}
      <SettingList>
        <FlexRowCenter>
          <IconBan />
          <ListTitle>{$t('MP.MP_WORD_BLOCK_MANAGE')}</ListTitle>
        </FlexRowCenter>
      </SettingList>
      {/* 데이터 절약 */}
      <SettingList
        onPress={(): void =>
          NavigationService.navigate('SettingSaveData')
        }
      >
        <FlexRowCenter>
          <IconDatabase />
          <ListTitle>{$t('MP.MP_WORD_SAVE_DATA')}</ListTitle>
        </FlexRowCenter>
      </SettingList>
      {/* 버전 정보 */}
      <SettingList disabled>
        <FlexRowCenter>
          <IconQuestion />
          <ListTitle>{$t('MP.MP_WORD_09')}</ListTitle>
        </FlexRowCenter>
        <Text style={{ fontSize: 13, color: Colors.nagative }}>
          {`${Platform.OS} - ${'버전정보추가해야해'}`}
        </Text>
      </SettingList>
      {/* 회원 탈퇴 */}
      <SettingList>
        <FlexRowCenter>
          <IconExit />
          <ListTitle>{$t('MP.MP_WORD_30')}</ListTitle>
        </FlexRowCenter>
      </SettingList>

      {/* Agreement 모달 */}
      <AgreementModal
        isPrivacy={isPrivacy}
        isTerms={isTerms}
        setIsPrivacy={setIsPrivacy}
        setIsTerms={setIsTerms}
      />
    </Body>
  )
}

export default MypageSettingScreen

const SettingList = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
`
const FlexRowCenter = styled.View`
  flex-direction: row;
  align-items: center;
`
const ListTitle = styled(Text)`
  margin-left: 10px;
  font-size: 16px;
`
const DropDownWrap = styled.View<{
  isShowDropDown: boolean
}>`
  opacity: ${(props): number => (props.isShowDropDown ? 1 : 0)};
  max-height: ${(props): string =>
    props.isShowDropDown ? 'auto' : '0'};
  overflow: hidden;
  transition: opacity 1s ease, max-height 1s ease;
`
const DropDownList = styled.TouchableOpacity`
  padding: 20px;
  background-color: ${Colors.gr};
`
const DropDownListTitle = styled(Text)`
  font-size: 14px;
`
