import Text from '@components/Text'
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '@constants'
import HablLogo from '@images/svg/HablLogo.svg'
import _ from 'lodash'
import moment from 'moment'
import PUSH from '@models/Common/PUSH'
import { getViewDateFromNow } from '@utils/timesUtils'

// 데이터 렌더링
function WalletList({
  item,
  index,
}: {
  item: PUSH
  index: number
}): React.JSX.Element {
  let showDate = false
  if (
    index === 0 ||
    (index > 0 &&
      !_.isEqual(
        moment(item.regdatetime).format('YYYY.MM.DD'),
        moment(item.regdatetime).format('YYYY.MM.DD')
      ))
  ) {
    showDate = true
  }

  return (
    <>
      {showDate && (
        <Text color={Colors.nagative} style={{ marginTop: 30 }}>
          {moment().format('YYYY.MM.DD ddd')}
        </Text>
      )}
      <TouchableOpacity
        style={styles.walletItemWrap}
        // todo갱민 클릭시 지갑 > 상세페이지로 이동
        // onPress={LinkBtn}
      >
        <View style={styles.hablProfile}>
          <HablLogo width={40} />
        </View>
        <View style={{ flexShrink: 1 }}>
          <Text style={{ lineHeight: 19 }}>{item?.pushMessage}</Text>
          <Text size={12} color={Colors.nagative}>
            {getViewDateFromNow(item?.regdatetime)}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  )
}
export default function WalletItem(props: {
  item: PUSH
  index: number
}): React.JSX.Element {
  return (
    <>
      <WalletList {...props} />
    </>
  )
}

const styles = StyleSheet.create({
  hablProfile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.bg2,
    marginRight: 8,
    paddingLeft: 5,
    paddingTop: 2,
    overflow: 'hidden',
  },
  walletItemWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
})
