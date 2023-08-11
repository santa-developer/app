import Text from '@components/Text'
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import SpaceMypageIntroItem from './SpaceMypageIntroItem'
import { Colors } from '@constants'
import NavigationService from '@service/NavigationService'
import { mySpaceListState } from '@recoil/atoms/Mypage/mypage'
import { useRecoilValue } from 'recoil'
import HISP_MGMT from '@models/Common/HISP_MGMT'

export default function SpaceMypageIntorScreen(): JSX.Element {
  const mySpaceList = useRecoilValue(mySpaceListState)

  const [list, setList] = useState<HISP_MGMT[]>([])

  useEffect(() => {
    setList(() => mySpaceList?.list || [])
  }, [])

  const handlePress = (): void => {
    NavigationService.push('MypageAllSpace')
  }

  return (
    <View style={styles.myspaceWrap}>
      <View style={styles.myspaceText}>
        <Text>{'나의 스페이스'}</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text color={Colors.active}>{'전체 스페이스 보기 >'}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={list}
          renderItem={SpaceMypageIntroItem}
          contentContainerStyle={{ gap: 10 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  myspaceWrap: {
    marginBottom: 35,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  myspaceText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
})
