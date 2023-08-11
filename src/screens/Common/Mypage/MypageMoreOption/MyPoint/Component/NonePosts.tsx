import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'
import { Colors, Images } from '@constants'
import Text from '@components/Text'

export default function NonePosts(): JSX.Element {
  return (
    <BeforeCountWrap>
      <ImageWrap>
        <BeforeImage source={Images.gif.folderIsEmpty} />
      </ImageWrap>
      <Text color={Colors.nagative} style={{ textAlign: 'center' }}>
        게시물이 없습니다.🙁
      </Text>
    </BeforeCountWrap>
  )
}

const BeforeCountWrap = styled.View`
  width: 100%;
`
const ImageWrap = styled.View`
  width: 100%;
  padding-top: 20px;
`
const BeforeImage = styled(Image)`
  object-fit: contain;
  width: 100%;
  height: 300px;
  margin: auto;
`
