import pushApi from '@api/push.api'
import Body from '@components/Body'
import { CommonHeader } from '@components/Header'
import Text from '@components/Text'
import ToggleSwitch from '@components/ToggleSwitch'
import { Colors } from '@constants'
import { StackNavigationOptions } from '@react-navigation/stack'
import $t from 'i18n'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

function NotificationSetting(): React.JSX.Element {
  const [available, setAvailable] = useState<boolean>(false)

  const [marketingToggle, setMarketingToggle] =
    useState<boolean>(false)
  const [agrtMrktDate, setAgrtMrktDate] = useState<string>()

  const [subToggles, setSubToggles] = useState<{
    [key in string]: boolean
  }>({})

  /** push 설정 가져오기 */
  const checkPushPermission = async (): Promise<void> => {
    const result = await pushApi.push.getPushSettings.get()
    if (result.check) {
      const {
        pushSettings: {
          sendYn01,
          sendYn02,
          sendYn03,
          sendYn04,
          sendYn05,
          sendYn06,
        },
        agrtMrktYn,
        agrtMkrtDate,
      } = result.response

      setMarketingToggle(agrtMrktYn === 'Y')
      setAgrtMrktDate(
        moment(moment.utc(agrtMkrtDate).toDate()).format(
          'YYYY-MM-DD HH:mm'
        )
      )
      setSubToggles({
        ['sendYn01']: sendYn01 === 'Y',
        ['sendYn02']: sendYn02 === 'Y',
        ['sendYn03']: sendYn03 === 'Y',
        ['sendYn04']: sendYn04 === 'Y',
        ['sendYn05']: sendYn05 === 'Y',
        ['sendYn06']: sendYn06 === 'Y',
      })
    } else {
      setSubToggles({
        ['sendYn01']: false,
        ['sendYn02']: false,
        ['sendYn03']: false,
        ['sendYn04']: false,
        ['sendYn05']: false,
        ['sendYn06']: false,
      })
    }
    setAvailable(true)
  }

  /** 마케팅 수신동의 설정 */
  const updateMarketingPushSettings = async (): Promise<void> => {
    if (available) {
      const result =
        await pushApi.push.updateMarketingPushSettings.post({
          agrtMrktYn: marketingToggle ? 'Y' : 'N',
        })
      setAgrtMrktDate(
        moment(moment.utc(result.response).toDate()).format(
          'YYYY-MM-DD HH:mm'
        )
      )
    }
  }

  useEffect(() => {
    checkPushPermission()
  }, [])

  useEffect(() => {
    updateMarketingPushSettings()
  }, [marketingToggle])

  useEffect(() => {
    if (available) {
      pushApi.push.updatePushSettings.post({
        sendYn01: subToggles['sendYn01'] ? 'Y' : 'N',
        sendYn02: subToggles['sendYn02'] ? 'Y' : 'N',
        sendYn03: subToggles['sendYn03'] ? 'Y' : 'N',
        sendYn04: subToggles['sendYn04'] ? 'Y' : 'N',
        sendYn05: subToggles['sendYn05'] ? 'Y' : 'N',
        sendYn06: subToggles['sendYn06'] ? 'Y' : 'N',
      })
    }
  }, [subToggles])
  return (
    <Body scrollable onRefresh={checkPushPermission}>
      <SettingList>
        {/* <ListTitle>좋아요, 댓글</ListTitle> */}
        <ListTitle>
          {$t('COMM.COMM_WORD_LIKE')}, {$t('COMM.COMM_WORD_COMMENT')}
        </ListTitle>
        <ToggleSwitch
          isOn={subToggles['sendYn01']}
          onPress={(): void => {
            setSubToggles({
              ...subToggles,
              ...{ ['sendYn01']: !subToggles['sendYn01'] },
            })
          }}
        />
      </SettingList>
      <SettingList>
        <ListTitle>
          {/* 팔로잉, 팔로워 */}
          {`${$t('COMM.COMM_WORD_FOLLOWING')}, ${$t(
            'COMM.COMM_WORD_FOLLOWER'
          )}`}
        </ListTitle>
        <ToggleSwitch
          isOn={subToggles['sendYn02']}
          onPress={(): void => {
            setSubToggles({
              ...subToggles,
              ...{ ['sendYn02']: !subToggles['sendYn02'] },
            })
          }}
        />
      </SettingList>
      <SettingList>
        <ListTitle>
          {/* 보상 */}
          {`${$t('COMM.COMM_WORD_24')}`}
        </ListTitle>
        <ToggleSwitch
          isOn={subToggles['sendYn03']}
          onPress={(): void => {
            setSubToggles({
              ...subToggles,
              ...{ ['sendYn03']: !subToggles['sendYn03'] },
            })
          }}
        />
      </SettingList>
      <SettingList>
        <ListTitle>
          {/* 다이렉트 메시지 */}
          {`${$t('MP.MP_WORD_40')}`}
        </ListTitle>
        <ToggleSwitch
          isOn={subToggles['sendYn05']}
          onPress={(): void => {
            setSubToggles({
              ...subToggles,
              ...{ ['sendYn05']: !subToggles['sendYn05'] },
            })
          }}
        />
      </SettingList>
      <SettingList>
        <ListTitle>
          {/* 기타 */}
          {`${$t('CMCD.CMCD_WORD_DEC_COTT_DVSN_CODE_99')}`}
        </ListTitle>
        <ToggleSwitch
          isOn={subToggles['sendYn06']}
          onPress={(): void => {
            setSubToggles({
              ...subToggles,
              ...{ ['sendYn06']: !subToggles['sendYn06'] },
            })
          }}
        />
      </SettingList>
      <SettingList>
        <View>
          <ListTitle>
            {/* 마케팅 정보 수신동의 */}
            {`${$t('USER.USER_WORD_39')}`}
          </ListTitle>
          {!marketingToggle && (
            <Text size={12} color={Colors.nagative}>
              {/* 마케팅 정보 수신동의 철회*/}
              {`${$t('MP.MP_WORD_47')} (${agrtMrktDate})`}
            </Text>
          )}
        </View>
        <ToggleSwitch
          isOn={marketingToggle}
          onPress={(): void => {
            setMarketingToggle(!marketingToggle)
          }}
        />
      </SettingList>
    </Body>
  )
}

export default NotificationSetting

/**
 * navigation 옵션
 */
NotificationSetting.navigationOptions =
  (): StackNavigationOptions => {
    return CommonHeader({
      // title: '알림 설정',
      title: `${$t('COMM.COMM_WORD_ALERT')} ${$t('MP.MP_WORD_20')}`,
    })
  }

const SettingList = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
`
const ListTitle = styled(Text)`
  font-size: 16px;
`
