import React, { useState, useEffect } from 'react'
import Body from '@components/Body'
import { CommonHeader } from '@components/Header'
import Text from '@components/Text'
import { Colors } from '@constants'
import { StackNavigationOptions } from '@react-navigation/stack'

import styled from 'styled-components/native'
import $t from 'i18n'
import { View } from 'react-native'
import { useRecoilState } from 'recoil'
import { ActivityTagLocationState } from '@recoil/atoms/Activity/Activity'

import LikeActve from './Component/Like/LikeActve'
import CommentActv from './Component/Comment/CommentActv'
import FollowingActv from './Component/Following/FollowingActv'
import TagActv from './Component/Tag/TagActv'
import WalletActv from './Component/Wallet/WalletActv'
import ComplainActv from './Component/Complain/ComplainActv'
import EtcActv from './Component/Etc/EtcActv'
import pushApi from '@api/push.api'

interface ICategoryButton {
  currentCategory: string
  currentButton: string
}

export default function ActivityScreen(): JSX.Element {
  const [category, setCategory] = useRecoilState(
    ActivityTagLocationState
  )
  const [component, setComponent] = useState(<LikeActve />)
  const [alarmCnt, setAlarmCnt] = useState<{
    decCnt: number
    walletCnt: number
    tagCnt: number
    replyCnt: number
    likeHateCnt: number
    followCnt: number
    etcCnt: number
  }>({
    decCnt: 0,
    walletCnt: 0,
    tagCnt: 0,
    replyCnt: 0,
    likeHateCnt: 0,
    followCnt: 0,
    etcCnt: 0,
  })
  const _getAlarmCnt = async (): Promise<void> => {
    return pushApi.push.alam
      .get()
      .then(async (result) => {
        if (result.check) {
          setAlarmCnt(result.response)
        } else {
          // await setDefaultMsg()
        }
      })
      .catch(async () => {
        // await setDefaultMsg()
      })
  }

  useEffect(() => {
    if (category === 'like') setComponent(<LikeActve />)
    if (category === 'comment') setComponent(<CommentActv />)
    if (category === 'following') setComponent(<FollowingActv />)
    if (category === 'tag') setComponent(<TagActv />)
    if (category === 'wallet') setComponent(<WalletActv />)
    if (category === 'complain') setComponent(<ComplainActv />)
    if (category === 'etc') setComponent(<EtcActv />)
    _getAlarmCnt()
  }, [category])

  return (
    <Body hidePadding>
      <View>
        <ActivityTabWrap
          horizontal
          contentContainerStyle={{ paddingRight: 35 }}
          showsHorizontalScrollIndicator={false}
        >
          <TabBtn
            currentButton="like"
            currentCategory={category}
            onPress={(): void => setCategory('like')}
          >
            <TagText currentButton="like" currentCategory={category}>
              좋아요・싫어요
            </TagText>
            {alarmCnt.likeHateCnt > 0 && (
              <AlertBadge>
                <Text
                  size={11}
                  color={Colors.wh}
                  style={{ textAlign: 'center' }}
                >
                  {alarmCnt.likeHateCnt}
                </Text>
              </AlertBadge>
            )}
          </TabBtn>
          <TabBtn
            currentButton="comment"
            currentCategory={category}
            onPress={(): void => setCategory('comment')}
          >
            <TagText
              currentButton="comment"
              currentCategory={category}
            >
              {$t('COMM.COMM_WORD_COMMENT')}
            </TagText>
            {alarmCnt.replyCnt > 0 && (
              <AlertBadge>
                <Text
                  size={11}
                  color={Colors.wh}
                  style={{ textAlign: 'center' }}
                >
                  {alarmCnt.replyCnt}
                </Text>
              </AlertBadge>
            )}
          </TabBtn>
          <TabBtn
            currentButton="following"
            currentCategory={category}
            onPress={(): void => setCategory('following')}
          >
            <TagText
              currentButton="following"
              currentCategory={category}
            >
              {$t('COMM.COMM_WORD_FOLLOWING')}
            </TagText>
            {alarmCnt.followCnt > 0 && (
              <AlertBadge>
                <Text
                  size={11}
                  color={Colors.wh}
                  style={{ textAlign: 'center' }}
                >
                  {alarmCnt.followCnt}
                </Text>
              </AlertBadge>
            )}
          </TabBtn>
          <TabBtn
            currentButton="tag"
            currentCategory={category}
            onPress={(): void => setCategory('tag')}
          >
            <TagText currentButton="tag" currentCategory={category}>
              태그
            </TagText>
            {alarmCnt.tagCnt > 0 && (
              <AlertBadge>
                <Text
                  size={11}
                  color={Colors.wh}
                  style={{ textAlign: 'center' }}
                >
                  {alarmCnt.tagCnt}
                </Text>
              </AlertBadge>
            )}
          </TabBtn>
          <TabBtn
            currentButton="wallet"
            currentCategory={category}
            onPress={(): void => setCategory('wallet')}
          >
            <TagText
              currentButton="wallet"
              currentCategory={category}
            >
              {$t('COMM.COMM_WORD_WALLET')}
            </TagText>
            {alarmCnt.walletCnt > 0 && (
              <AlertBadge>
                <Text
                  size={11}
                  color={Colors.wh}
                  style={{ textAlign: 'center' }}
                >
                  {alarmCnt.walletCnt}
                </Text>
              </AlertBadge>
            )}
          </TabBtn>
          <TabBtn
            currentButton="complain"
            currentCategory={category}
            onPress={(): void => setCategory('complain')}
          >
            <TagText
              currentButton="complain"
              currentCategory={category}
            >
              신고내역
            </TagText>
            {alarmCnt.decCnt > 0 && (
              <AlertBadge>
                <Text
                  size={11}
                  color={Colors.wh}
                  style={{ textAlign: 'center' }}
                >
                  {alarmCnt.decCnt}
                </Text>
              </AlertBadge>
            )}
          </TabBtn>
          <TabBtn
            currentButton="etc"
            currentCategory={category}
            onPress={(): void => setCategory('etc')}
          >
            <TagText currentButton="etc" currentCategory={category}>
              {$t('CMCD.CMCD_WORD_DEC_COTT_DVSN_CODE_99')}
            </TagText>
            {alarmCnt.etcCnt > 0 && (
              <AlertBadge>
                <Text
                  size={11}
                  color={Colors.wh}
                  style={{ textAlign: 'center' }}
                >
                  {alarmCnt.etcCnt}
                </Text>
              </AlertBadge>
            )}
          </TabBtn>
        </ActivityTabWrap>
      </View>
      <ComponentWrap>{component}</ComponentWrap>
    </Body>
  )
}

// 헤더 설정
function HeaderLeft(): JSX.Element {
  return (
    <HeaderWrap>
      <Text color={Colors.bl} size={16} lineHeight={20} bold={'500'}>
        {$t('COMM.WORD_ACTIVITY_HISTORY')}
      </Text>
    </HeaderWrap>
  )
}

const HeaderWrap = styled.View`
  padding: 18px 10px 18px 18px;
  justify-content: center;
`

ActivityScreen.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    headerLeft: HeaderLeft,
  })
}

const ActivityTabWrap = styled.ScrollView`
  padding: 15px 15px 0 15px;
  /* background-color: #eee; */
`

const TabBtn = styled.TouchableOpacity<ICategoryButton>`
  position: relative;
  padding: 5px 12px;
  border-width: 1px;
  border-color: ${(props): string => {
    if (props.currentButton === props.currentCategory)
      return Colors.bl

    return Colors.disabled
  }};
  background-color: ${(props): string => {
    if (props.currentButton === props.currentCategory)
      return Colors.bl

    return Colors.wh
  }};

  margin: 0 6px;
  border-radius: 50px;
`

const TagText = styled(Text)<ICategoryButton>`
  color: ${(props): string =>
    props.currentButton === props.currentCategory
      ? Colors.wh
      : Colors.nagative};
`

const AlertBadge = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-color: ${Colors.active};
  padding-top: 1px;
  position: absolute;
  right: -5px;
  top: -10px;
`

const ComponentWrap = styled.View`
  padding: 0 15px 15px;
`
