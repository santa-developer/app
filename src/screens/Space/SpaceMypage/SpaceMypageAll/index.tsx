import React, { useEffect, useState } from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import { Colors, Layout } from '@constants'
import Text from '@components/Text'
import IconStar from '@images/svg/IconStar.svg'
import _ from 'lodash'
import { useRecoilValue } from 'recoil'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import mypage from '@api/mypage.api'
import HISP_MGMT from '@models/Common/HISP_MGMT'
import ImageUtils from '@utils/ImageUtils'

const MypageFF = ({ item }: { item: HISP_MGMT }): JSX.Element => {
  return (
    <>
      <MypageAllSpaceItem {...item} />
    </>
  )
}

const MypageAllSpaceItem = (item: HISP_MGMT): JSX.Element => {
  const [isPress, setIsPress] = useState(item?.favYn === 'Y')
  const userInfo = useRecoilValue(loginedUserInfoState) // 내정보 가져오기

  return (
    <View
      style={{
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <View
          style={{
            width: 65,
            height: 65,
            backgroundColor: Colors.gr2,
          }}
        >
          <Image
            source={ImageUtils.getImageSource({
              type: 'userSquare',
              id: item?.logoFileMgmtNmbr,
              size: 200,
            })}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View style={{ marginLeft: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {item?.mebrMgmtNmbr === userInfo.mebrMgmtNmbr && (
              <View
                style={{
                  paddingHorizontal: 8,
                  backgroundColor: Colors.active,
                  height: 18,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 4,
                }}
              >
                <Text color={Colors.wh} size={10}>
                  MY
                </Text>
              </View>
            )}
            <Text bold={'500'}>{item.hispName}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              color={Colors.active}
              size={12}
            >{`${item.flwgCnt}명`}</Text>
            <Text size={12}>・{item.ctgrName}</Text>
          </View>
          <View style={{ top: 3 }}>
            <Text
              style={{
                width: Layout.bodyWidth - 65,
              }}
              color={Colors.nagative}
              numberOfLines={1}
            >
              {item?.hispInf}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{ flex: 1, alignItems: 'flex-end' }}
        onPress={(): void => setIsPress((is) => !is)}
      >
        <IconStar fill={isPress ? Colors.staking : Colors.disabled} />
      </TouchableOpacity>
    </View>
  )
}

export default function MypageAllSpace(): JSX.Element {
  const [spaceList, setSpaceList] = useState<HISP_MGMT[]>([])
  const myUserInfo = useRecoilValue(loginedUserInfoState)

  const initailize = async (): Promise<void> => {
    const params = {
      mebrMgmtNmbr: myUserInfo.mebrMgmtNmbr,
      spaceLimit: 10,
    }

    const result = await mypage.getMySpaceList.get(params)
    if (result.check) {
      const { list } = result.response
      setSpaceList(() => list)
    }
    // const result = await mypage.all()
  }

  useEffect(() => {
    initailize()
  }, [])

  const [isRefresh, setIsRefresh] = useState(false)

  return (
    <>
      {!_.isEmpty(spaceList) && (
        <FlatList
          data={spaceList}
          renderItem={MypageFF}
          refreshing={isRefresh}
          showsVerticalScrollIndicator={false}
          onRefresh={(): void => {
            setIsRefresh(true)
            setIsRefresh(false)
          }}
        />
      )}
    </>
  )
}

MypageAllSpace.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: '스페이스 전체보기',
  })
}
