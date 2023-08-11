import React from 'react'
import styled from 'styled-components/native'

interface Props {
  contents: string
}

const ContentsWrapper = styled.View`
  margin-top: 15px;
`

const Contents = styled.Text`
  font-weight: 700;
  font-size: 15px;
`

const TopContents = (props: Props): JSX.Element => {
  return (
    <ContentsWrapper>
      <Contents>{props.contents}</Contents>
    </ContentsWrapper>
  )
}

export default TopContents
