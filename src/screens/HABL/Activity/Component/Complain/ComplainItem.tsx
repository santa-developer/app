import Text from '@components/Text'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Colors } from '@constants'
import _ from 'lodash'
import moment from 'moment'
import HablLogo from '@images/svg/HablLogo.svg'
import PUSH from '@models/Common/PUSH'
import { getViewDateFromNow } from '@utils/timesUtils'

// 데이터 렌더링
function ComplainList({
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
          {/* {item.showDate} */}
          {moment().format('YYYY.MM.DD ddd')}
        </Text>
      )}

      <TouchableOpacity
        style={styles.feedbackWrap} // todo갱민 게시글 상세페이지로 이동
        // onPress={LinkBtn}
      >
        <View style={styles.hablProfile}>
          <HablLogo width={40} />
        </View>
        <View style={{ flex: 4 }}>
          <Text style={{ lineHeight: 19 }}>{item?.pushMessage}</Text>
          <Text size={12} color={Colors.nagative}>
            {getViewDateFromNow(item?.regdatetime)}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  )
}
export default function ComplainItem(props: {
  item: PUSH
  index: number
}): React.JSX.Element {
  return (
    <>
      <ComplainList {...props} />
    </>
  )
}

const styles = StyleSheet.create({
  feedbackWrap: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hablProfile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: Colors.bg2,
    borderWidth: 1,
    marginRight: 8,
    paddingLeft: 5,
    paddingTop: 2,
  },
})
