import Text from '@components/Text'
import React from 'react'
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Colors } from '@constants'
import _ from 'lodash'
import moment from 'moment'
import PUSH from '@models/Common/PUSH'
import ImageUtils from '@utils/ImageUtils'
import { getViewDateFromNow } from '@utils/timesUtils'

function CommentList({
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
          {moment(item?.regdatetime).format('YYYY.MM.DD ddd')}
        </Text>
      )}
      <TouchableOpacity
        // todo갱민 게시물 상세페이지 이동
        // onPress={_hanleFeedLinkBtn}
        style={styles.commentItemWrap}
      >
        <View style={styles.userInfoWrap}>
          <View style={styles.userProfile}>
            <Image
              source={ImageUtils.getImageSource({
                type: 'user',
                id: item?.sMebrFileMgmtNmbr,
                size: 200,
              })}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
          <View style={{ flex: 4 }}>
            <Text>
              {/* 님이 내 글을 댓글을 남겼습니다:{' '} */}
              {item?.pushMessage}
            </Text>
            <Text size={12} color={Colors.nagative}>
              {getViewDateFromNow(item?.regdatetime)}
            </Text>
          </View>
        </View>
        <View style={styles.feedThumbNailWrap}>
          <Image
            source={ImageUtils.getImageSource({
              type: 'feed',
              id: item?.bltbThnl,
              size: 200,
            })}
            style={{ width: 50, height: 50 }}
          />
        </View>
      </TouchableOpacity>
    </>
  )
}

export default function CommentItem(props: {
  item: PUSH
  index: number
}): React.JSX.Element {
  return (
    <>
      <CommentList {...props} />
    </>
  )
}

const styles = StyleSheet.create({
  commentItemWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  userInfoWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 4,
  },
  userProfile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 8,
    overflow: 'hidden',
  },
  feedThumbNailWrap: {
    width: 50,
    height: 50,
    backgroundColor: Colors.active,
    marginLeft: 8,
  },
})
