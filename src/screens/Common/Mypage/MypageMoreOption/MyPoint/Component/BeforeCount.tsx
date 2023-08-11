import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'
import { Colors, Images } from '@constants'
import Text from '@components/Text'

export default function BeforeCount(): React.JSX.Element {
  return (
    <BeforeCountWrap>
      <ImageWrap>
        <BeforeImage
          source={Images.gif.boyReadingFinancialLiteratureBook}
        />
      </ImageWrap>
      <Text color={Colors.nagative} style={{ textAlign: 'center' }}>
        월요일(UCT기준) 포인트는 익일 정산되기 {`\n`} 때문에 지금은
        환인할 수 없어요.🙁{' '}
      </Text>
    </BeforeCountWrap>
  )
}

const BeforeCountWrap = styled.View`
  width: 100%;
`
const ImageWrap = styled.View`
  width: 100%;
  padding-top: 30px;
`
const BeforeImage = styled(Image)`
  object-fit: contain;
  width: 80%;
  height: 300px;
  margin: auto;
`
