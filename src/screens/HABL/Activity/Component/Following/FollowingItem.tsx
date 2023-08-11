import Text from '@components/Text'
import React, { useState } from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Colors } from '@constants'
import _ from 'lodash'
import moment from 'moment'
import PUSH from '@models/Common/PUSH'
import ImageUtils from '@utils/ImageUtils'
import { getViewDateFromNow } from '@utils/timesUtils'
import NavigationService from '@service/NavigationService'

function FollowingList({
  item,
  index,
}: {
  item: PUSH
  index: number
}): React.JSX.Element {
  const [isFollowing, setIsFollowing] = useState(
    item.followYn === 'Y'
  )
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
        style={styles.followingItemWrap}
        onPress={(): void => {
          NavigationService.push('MypageHome', {
            mebrMgmtNmbr: item?.smebrMgmtNmbr,
          })
        }}
      >
        <View style={styles.userInfoWrap}>
          <View style={styles.userInfoProfile}>
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
            <Text style={{ lineHeight: 19 }}>{item.pushMessage}</Text>
            <Text size={12} color={Colors.nagative}>
              {getViewDateFromNow(item?.regdatetime)}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.followerBtn,
              isFollowing && styles.followingBtn,
            ]}
            onPress={(): void => {
              // 펄로우, 팔로잉 액션
              setIsFollowing((prev) => !prev)
            }}
          >
            <Text color={isFollowing ? Colors.active : Colors.wh}>
              {isFollowing ? '팔로잉' : '팔로우'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
  )
}

export default function FollowingItem(props: {
  item: PUSH
  index: number
}): JSX.Element {
  return (
    <>
      <FollowingList {...props} />
    </>
  )
}

const styles = StyleSheet.create({
  followingItemWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  userInfoWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fles: 4,
  },
  userInfoProfile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 8,
    overflow: 'hidden',
  },
  followerBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: Colors.active,
    borderRadius: 50,
  },
  followingBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 50,
    backgroundColor: Colors.wh,
    borderColor: Colors.active,
    borderWidth: 1,
  },
})
