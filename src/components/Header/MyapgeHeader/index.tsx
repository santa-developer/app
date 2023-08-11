import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MypageHeaderLeft from './MypageHeaderLeft'
import MypageHeaderCenter from './MypageHeaderCenter'
import MypageHeaderRight from './MypageHeaderRight'
import { IMypage } from '@models/Mypage/MYPAGE'
import { Colors, Layout } from '@constants'
import { useRecoilValue } from 'recoil'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import {
  mebrMgmtNmbrFromUniqueKeyState,
  trackingMypageInfoState,
} from '@recoil/atoms/Mypage/mypage'

export default function MypageHeader(props: IMypage): JSX.Element {
  const [userId, setUserId] = useState('')
  const [isMypage, setIsMypage] = useState(false)

  const myInfo = useRecoilValue(loginedUserInfoState)
  const mebrMgmtNmbrFromUniqueKey = useRecoilValue(
    mebrMgmtNmbrFromUniqueKeyState
  )

  const trackingMypageInfo = useRecoilValue(trackingMypageInfoState)

  useEffect(() => {
    if (props.uniqueKey) {
      const mebrMgmtNmbr = mebrMgmtNmbrFromUniqueKey[props.uniqueKey]
      // console.log(mebrMgmtNmbr)
      if (mebrMgmtNmbr) {
        const info = trackingMypageInfo[mebrMgmtNmbr]
        setUserId(() => info.userInfo?.userId || '')
        setIsMypage(
          () => info?.userInfo?.mebrMgmtNmbr === myInfo.mebrMgmtNmbr
        )
      }
    } else {
      setIsMypage(true)
    }
  }, [mebrMgmtNmbrFromUniqueKey])

  return (
    <>
      <View style={styles.wrap}>
        <MypageHeaderLeft userId={userId} isMypage={isMypage} />
        <MypageHeaderCenter userId={userId} isMypage={isMypage} />
        <MypageHeaderRight isMypage={isMypage} />
      </View>
      <View style={styles.hr} />
    </>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    paddingTop: Layout.statusBarHeight - 6,
    zIndex: 999,
    backgroundColor: Colors.wh,
  },
  hr: {
    borderWidth: 0.6,
    borderColor: Colors.wh2,
  },
})
