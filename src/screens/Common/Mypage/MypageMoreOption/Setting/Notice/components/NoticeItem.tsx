import Text from '@components/Text'
import { Colors } from '@constants'
import { NOTICE } from '@models/Mypage/NOTICE'
import NavigationService from '@service/NavigationService'
import moment from 'moment'
import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-fontawesome-pro'
import styled from 'styled-components/native'

export const NoticeItem = ({
  item,
}: {
  item: NOTICE
}): React.JSX.Element => {
  const { impYn, nteTitle, nteContents, regdatetime } = item
  return (
    <NoticeItemWrap
      onPress={(): void =>
        NavigationService.push('NoticeDetail', {
          impYn,
          nteTitle,
          nteContents,
          regdatetime,
        })
      }
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          {impYn === 'Y' && (
            <Text color={Colors.active}>[중요] </Text>
          )}
          <Text
            style={{ flex: 1 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {nteTitle}
          </Text>
        </View>
        <Text size={12} color={Colors.nagative}>
          {moment.utc(regdatetime).format('YY.MM.DD')}
        </Text>
      </View>
      <View>
        <Icon
          name="chevron-right"
          type="light"
          color={Colors.nagative}
          size={15}
        />
      </View>
    </NoticeItemWrap>
  )
}

const NoticeItemWrap = styled.TouchableOpacity`
  height: 58px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
