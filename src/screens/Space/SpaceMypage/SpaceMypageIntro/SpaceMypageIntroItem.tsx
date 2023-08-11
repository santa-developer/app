import Text from '@components/Text'
import { Colors } from '@constants'
import HISP_MGMT from '@models/Common/HISP_MGMT'
import { mySelectSpaceState } from '@recoil/atoms/Mypage/mypage'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import ImageUtils from '@utils/ImageUtils'
import React from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { useRecoilState, useRecoilValue } from 'recoil'
import IconCheck from '@images/svg/IconCheck.svg'

function SpaceMypageIntroItems(item: HISP_MGMT): JSX.Element {
  const myUserInfo = useRecoilValue(loginedUserInfoState)
  const [mySelectSpace, setMySelectSpace] = useRecoilState(
    mySelectSpaceState
  )
  const handlePress = (): void => {
    setMySelectSpace(item.hispMgmtNmbr)
  }

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
      <View style={{ position: 'relative' }}>
        {myUserInfo.mebrMgmtNmbr === item.hispMgmtNmbr && (
          <View style={styles.mySpaceText}>
            <Text size={10} color={Colors.wh}>
              {'MY'}
            </Text>
          </View>
        )}
        {mySelectSpace === item.hispMgmtNmbr && (
          <View
            style={{
              position: 'absolute',
              zIndex: 99,
              transform: [{ translateY: 35 }, { translateX: 35 }],
            }}
          >
            <IconCheck width={30} height={30} />
          </View>
        )}
        <Image
          source={ImageUtils.getImageSource({
            type: 'userSquare',
            id: item?.logoFileMgmtNmbr,
            size: 200,
          })}
          blurRadius={item.hispMgmtNmbr === mySelectSpace ? 3 : 0}
          resizeMode="cover"
          style={{
            width: 100,
            height: 100,
            backgroundColor: Colors.info,
          }}
        />
      </View>
      <View style={styles.spaceName}>
        <Text color={Colors.bl} bold={'500'} size={12}>
          {item?.hispName}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default function SpaceMypageIntroItem({
  item,
}: {
  item: HISP_MGMT
}): JSX.Element {
  return (
    <>
      <SpaceMypageIntroItems {...item} />
    </>
  )
}

const styles = StyleSheet.create({
  spaceName: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  mySpaceText: {
    position: 'absolute',
    zIndex: 99,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: Colors.active,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    marginTop: 4,
  },
})
