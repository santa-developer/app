import Text from '@components/Text'
import { Colors, Dev } from '@constants'
import React, { useState } from 'react'
import styled from 'styled-components/native'
import Instargram from '@images/svg/Instargram.svg'
import { View } from 'react-native'
import { CardProps } from '../CardModel'
import Hyperlink from '@components/Hyperlink'

export default function CardContents(props: CardProps): JSX.Element {
  const { item } = props
  const [isCollapse, setIsCollapse] = useState(false)

  const handleCollapse = (): void => {
    setIsCollapse((is) => !is)
  }

  return (
    <FeedContentContainer isCollapse={isCollapse}>
      <FeedContentWrap>
        <View>
          <View style={{ marginBottom: item?.bltbCott ? 0 : 30 }}>
            {item?.bltbCott && (
              <Hyperlink onLinkPress={(): void => Dev.log('sldkjf')}>
                <Text>{item?.bltbCott}</Text>
              </Hyperlink>
            )}
          </View>
          <LikeText>{`${item?.likeCnt}개의 좋아여를 받았습니다.`}</LikeText>
          <SourceContainer>
            <Instargram />
            <SourceText>
              {`출처 - ${'https://www.instagram.com'}\n제테크가 되는 소셜미디어?\n나. 이. 또 !!\n구글펠레이/앱스토에서asd`}
            </SourceText>
          </SourceContainer>
        </View>
        <FolderButton onPress={handleCollapse}>
          <Text color={Colors.active}>
            {isCollapse ? '접기' : '펼치기'}
          </Text>
        </FolderButton>
      </FeedContentWrap>
    </FeedContentContainer>
  )
}

const FeedContentContainer = styled.View<{ isCollapse?: boolean }>`
  padding: 15px;
  height: ${(props): string => (props.isCollapse ? 'auto' : '60px')};
  overflow: hidden;
`
const FeedContentWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const LikeText = styled(Text)`
  margin-top: 15px;
`

const SourceContainer = styled.TouchableOpacity`
  width: 100%;
  height: auto;
  border: 1px solid ${Colors.active};
  margin: 8px 0;
  flex-direction: row;
  padding: 10px 20px 10px 10px;
  justify-content: space-between;
  border-radius: 5px;
`
const SourceText = styled(Text)`
  width: 85%;
  margin: 0 15px;
`
const FolderButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
`
