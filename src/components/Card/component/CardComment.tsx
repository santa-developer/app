import Text from '@components/Text'
import { Colors } from '@constants'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import { CardProps } from '../CardModel'
import NavigationService from '@service/NavigationService'
import home from '@api/home.api'
import BLTB_COMT from '@models/Common/BLTB_COMT'

export default function CardComment(props: CardProps): JSX.Element {
  const { item } = props
  const [comtList, setComtList] = useState<BLTB_COMT[]>([])

  const commentInit = async (): Promise<void> => {
    if (item) {
      const params = {
        postMgmtNmbr: item.postMgmtNmbr,
        currPage: 1,
        recordCountPerPage: 2,
      }
      const result = await home.comtListProc.get({ params })

      if (result.check) {
        const list = result.response.list
        setComtList(list)
      }
    }
  }

  useEffect(() => {
    commentInit()
  }, [])

  return (
    <CommentContainer>
      <TouchableOpacity>
        <Text color={Colors.nagative}>
          댓글 {item && item?.comtCnt} 모두 보기
        </Text>
      </TouchableOpacity>
      <View>
        {comtList.map((comtItem, index) => {
          return (
            <CommentView key={index} comtLevl={comtItem.comtLevl}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={(): void =>
                  NavigationService.push('MypageHome', {
                    mebrMgmtNmbr: comtItem.reguserid,
                  })
                }
              >
                <CommentUser bold="500">
                  {comtItem.userId}
                </CommentUser>
              </TouchableOpacity>
              <Comment>{comtItem.comtCott}</Comment>
            </CommentView>
          )
        })}
      </View>
    </CommentContainer>
  )
}
const CommentContainer = styled.View`
  padding: 10px 15px;
`
const CommentView = styled.View<{ comtLevl?: string }>`
  flex-direction: row;
  margin-top: 3px;
  margin-left: ${(props): number =>
    props.comtLevl === '2' ? 10 : 0}px;
  margin-bottom: ${(props): number =>
    props.comtLevl === '2' ? 5 : 0}px;
`
const CommentUser = styled(Text)`
  margin-right: 15px;
`
const Comment = styled(Text)`
  color: ${Colors.nagative};
`
