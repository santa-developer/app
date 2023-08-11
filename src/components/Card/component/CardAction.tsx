import React, { useEffect, useState } from 'react'
import IconShare from '@images/svg/IconShare.svg'
import Instargram from '@images/svg/Instargram.svg'
import Youtube from '@images/svg/Youtube.svg'
import Facebook from '@images/svg/Facebook.svg'
import Tiktok from '@images/svg/Tiktok.svg'
import LinkedIn from '@images/svg/LinkedIn.svg'
import NaverBlog from '@images/svg/NaverBlog.svg'
import NaverPost from '@images/svg/NaverPost.svg'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { CardProps } from '../CardModel'
import { getCutNumber } from '@utils/NumberUtils'
import commonApi from '@api/common.api'
import $t from 'i18n'
import { useToast } from '@hooks/useCommonAlert'
import { useRecoilValue } from 'recoil'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import ActivityButton from '@components/Button/ActivityButton'
import _ from 'lodash'
import bltb from '@api/bltb.api'

export default function CardAction(props: CardProps): JSX.Element {
  const { item } = props
  const toast = useToast()
  const userInfo = useRecoilValue(loginedUserInfoState)

  const [isLike, setIsLike] = useState(false)
  const [isHate, setIsHate] = useState(false)
  const [myLikCnt, setMyLinkCnt] = useState(
    _.isEmpty(item) ? false : item?.myLikeCnt > 0
  )
  const [myHateCnt, setMyHateCnt] = useState(
    _.isEmpty(item) ? false : item?.myHateCnt > 0
  )

  const handleLike = async (): Promise<void> => {
    if (item?.reguserid === userInfo.mebrMgmtNmbr) {
      toast({
        desc: '본인 게시물에는 좋아요 할 수 없습니다.',
        type: 'error',
      })
      return
    }

    if (myLikCnt) {
      toast({ desc: '이미 좋아요 하셨습니다.', type: 'error' })
      return
    }

    // 좋아요 카운트
    await bltb.atvtLikeProc.post({
      params: { postMgmtNmbr: item?.postMgmtNmbr || '' },
    })

    setMyLinkCnt(true)
    setIsLike((like) => !like)
  }

  const handleHate = async (): Promise<void> => {
    if (item?.reguserid === userInfo.mebrMgmtNmbr) {
      toast({
        desc: '본인 게시물에는 싫어요 할 수 없습니다.',
        type: 'error',
      })
      return
    }
    if (myHateCnt) {
      toast({ desc: '이미 싫어요 하셨습니다.', type: 'error' })
      return
    }

    // 싫어요 카운트
    await bltb.atvtHateProc.post({
      params: { postMgmtNmbr: item?.postMgmtNmbr || '' },
    })
    setMyHateCnt(true)
    setIsHate((hate) => !hate)
  }

  useEffect(() => {
    setIsLike(() => item?.myLikeCnt === 1)
    setIsHate(() => item?.myHateCnt === 1)
  }, [])

  // 공유하기 이벤트
  const handleShare = async (): Promise<void> => {
    if (item) {
      const url = await commonApi.buildShareLink({
        type: 'BD',
        mgmtNmbr: item.postMgmtNmbr,
        thnl: item.bltbThnl,
        message: item.bltbCott || item.bltbSbjt,
      })
      const title = `[${$t('COMM.COMM_WORD_HABL')}-${$t(
        'COMM.COMM_WORD_MEDIA'
      )}]\n`
      const message = item.bltbCott || item.bltbSbjt

      commonApi.shareTo({
        url,
        title,
        message,
      })
    }
  }

  return (
    <View style={styles.wrapper}>
      {item && (
        <>
          <View style={styles.actionContainer}>
            <ActivityButton
              activity={isLike ? 'like' : 'likeN'}
              clicked={myLikCnt}
              onPress={handleLike}
              opYn={isLike ? 'Y' : 'N'}
              activityCount={getCutNumber(item?.likeCnt)}
            />
            <ActivityButton
              activity={isHate ? 'hate' : 'hateN'}
              clicked={myHateCnt}
              onPress={handleHate}
              opYn={isHate ? 'Y' : 'N'}
            />
            <TouchableOpacity
              style={styles.iconWrap}
              onPress={handleShare}
            >
              <IconShare />
            </TouchableOpacity>
          </View>
          <View>
            {item?.urlType === 'I' ? (
              <Instargram />
            ) : item?.urlType === 'Y' ? (
              <Youtube />
            ) : item?.urlType === 'F' ? (
              <Facebook />
            ) : item?.urlType === 'T' ? (
              <Tiktok />
            ) : item?.urlType === 'L' ? (
              <LinkedIn />
            ) : item?.urlType === 'NB' ? (
              <NaverBlog />
            ) : item?.urlType === 'NP' ? (
              <NaverPost />
            ) : (
              <></>
            )}
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
