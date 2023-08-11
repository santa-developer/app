import Text from '@components/Text'
import { Colors, Images } from '@constants'
import React, { useState } from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

function FollowItemScreen(): JSX.Element {
  const [isFollow, setIsFollow] = useState(false)

  const handlePress = (): void => {
    setIsFollow((isFollow) => !isFollow)
  }

  return (
    <View style={styles.userWrap}>
      <TouchableOpacity activeOpacity={0.5} style={styles.userInfo}>
        <Image source={Images.png.profile} style={styles.profile} />
        <View style={styles.userIntroduce}>
          <Text>user_id01</Text>
          <Text numberOfLines={1}>
            user_id01 님의 자기소개
            입니sdfdsdasdsadaasdassdaassfsdf다. 하하하
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={[styles.followerBtn, isFollow && styles.followingBtn]}
      >
        <Text color={isFollow ? Colors.active : Colors.wh}>
          {isFollow ? '팔로잉' : '팔로우'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default function FollowItem(): JSX.Element {
  return (
    <>
      <FollowItemScreen />
    </>
  )
}

const styles = StyleSheet.create({
  userWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 4,
  },
  profile: {
    width: 50,
    height: 50,
    marginRight: 5,
  },
  userIntroduce: {
    marginRight: 12,
    flex: 4,
  },
  followerBtn: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 50,
    backgroundColor: Colors.active,
  },
  followingBtn: {
    backgroundColor: Colors.wh,
    borderColor: Colors.active,
    borderWidth: 1,
  },
})
