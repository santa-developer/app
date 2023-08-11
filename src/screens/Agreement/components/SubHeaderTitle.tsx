import { Colors } from '@constants'
import React from 'react'
import styled from 'styled-components/native'

interface Props {
  numbering?: string
  title: string
}

const SubTitleWrapper = styled.View`
  width: 100%;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.wh2};
  margin-bottom: 10px;
`
const SubHeaderTitle = styled.Text`
  color: ${Colors.bl};
  font-size: 16px;
`

const SubHeaderTitleComponent = (props: Props): JSX.Element => {
  return (
    <SubTitleWrapper style={{}}>
      <SubHeaderTitle>{props.title}</SubHeaderTitle>
    </SubTitleWrapper>
  )
}

export default SubHeaderTitleComponent
