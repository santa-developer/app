import Text from '@components/Text'
import React, { useState, useEffect } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Colors, Images } from '@constants'
import HunterModal from './HunterModal'
import dec from '@api/dec.api'
import pushApi from '@api/push.api'
import PUSH from '@models/Common/PUSH'
import ComplainItem from './ComplainItem'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import { useRecoilValue } from 'recoil'
import NoneActiveList from '../NoneListItem'
import _ from 'lodash'

export default function ComplainActv(): React.JSX.Element {
  const loginedUserInfo = useRecoilValue(loginedUserInfoState) //  로그인 유저 정보
  const [isVisible, setIsVisible] = useState(false)
  const [isHunter, setIsHunter] = useState<string>('')
  const [complainList, setComplainList] = useState<PUSH[]>([])

  // 헌터여부 확인하기
  const _loadHunterYn = async (): Promise<void> => {
    const result = await dec.hunter.post()
    if (result.check) {
      setIsHunter(result.response.weekHunterYn)
    }
  }

  // 신고 목록 가져오기
  const params = {
    pushTypeArr: ['6'],
  }

  const _actvList = async (): Promise<void> => {
    const result = await pushApi.push.listProc.get({ params })
    if (result.check) {
      const { list } = result.response
      setComplainList(() => list)
    }
  }

  useEffect(() => {
    _loadHunterYn()
    _actvList()
  }, [])

  // 헌터 정보 모달 띄우기
  const showModal = (): void => {
    setIsVisible(true)
  }

  return (
    <>
      {isHunter === 'Y' ? (
        // 헌터일 때
        <View>
          <View style={styles.hunterInfo}>
            <Text size={16} bold={'500'}>
              {loginedUserInfo.userId}님, 금주의 헌터입니다. {`\n`}
              유해게시물을 찾으면 보상을 드려요!
            </Text>
            <TouchableOpacity onPress={showModal}>
              <Text color={Colors.active}>자세히 보기 {`>`}</Text>
            </TouchableOpacity>
            {isVisible && (
              <HunterModal
                isVisible={true}
                setIsVisible={setIsVisible}
              />
            )}
          </View>
          <View style={styles.body}>
            {_.isEmpty(complainList) ? (
              <NoneActiveList />
            ) : (
              <FlatList
                data={complainList}
                renderItem={ComplainItem}
                keyExtractor={(item, index): string =>
                  index.toString()
                }
                contentContainerStyle={{ paddingBottom: 100 }}
              />
            )}
          </View>
        </View>
      ) : (
        // 헌터 아닐 때
        <View>
          <View style={styles.hunterInfo}>
            <Text size={16} bold={'500'}>
              {loginedUserInfo.userId}님, {`\n`} 스테이킹으로 헌터가
              되어보세요!
            </Text>
            <TouchableOpacity onPress={showModal}>
              <Text color={Colors.active}>자세히 보기 {`>`}</Text>
            </TouchableOpacity>
            {isVisible && (
              <HunterModal
                isVisible={true}
                setIsVisible={setIsVisible}
              />
            )}
          </View>
          <View>
            <View style={styles.imageWrap}>
              <Image
                source={Images.gif.folderIsEmpty}
                style={styles.noneHunterList}
              />
            </View>
            <Text
              color={Colors.nagative}
              style={{ textAlign: 'center' }}
            >
              게시물이 없습니다. 😐
            </Text>
          </View>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  body: {
    height: '100%',
  },
  hunterInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 30,
    paddingBottom: 10,
  },
  imageWrap: {
    width: '100%',
  },
  noneHunterList: {
    objectFit: 'contain',
    width: '100%',
    height: 350,
    margin: 'auto',
  },
})
