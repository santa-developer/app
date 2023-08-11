import { Colors } from '@constants'
import React from 'react'
import styled from 'styled-components/native'

interface Props {
  contents: string
}

const NomalText = styled.Text`
  font-size: 14px;
  color: ${Colors.nagative};
`

const NomalContents = (props: Props): JSX.Element => {
  return <NomalText>{props.contents}</NomalText>
}

export default NomalContents
