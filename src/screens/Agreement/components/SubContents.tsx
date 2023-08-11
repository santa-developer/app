import { Colors } from '@constants'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

interface SubContents {
  subNumbering?: string
  subContents?: string
}

interface Props {
  numbering?: string
  boldcontents?: string
  underlinecontents?: string
  contents?: string
  subContents?: SubContents[]
}

const Wrapper = styled.View`
  margin-top: 10px;
`
const SubTitleWrapper = styled.View`
  flex-direction: row;
  padding-right: 5px;
`
const NumberingTextWrapper = styled.View`
  margin-right: 5px;
`
const NumberingText = styled.Text`
  font-size: 14px;
  color: ${Colors.nagative};
`
const BoldCOntents = styled.Text`
  font-size: 14px;
  color: ${Colors.bl};
`
const UnderLineContents = styled.Text`
  font-size: 14px;
  text-decoration: underline;
`
const Contents = styled.Text`
  font-size: 14px;
  color: ${Colors.nagative};
`
const LowContents = styled.Text`
  font-size: 14px;
  color: ${Colors.nagative};
`

const SubContents = (props: Props): JSX.Element => {
  return (
    <Wrapper>
      <SubTitleWrapper>
        {props.numbering && (
          <NumberingTextWrapper>
            <NumberingText>{props.numbering}</NumberingText>
          </NumberingTextWrapper>
        )}
        <View style={{ paddingRight: 20 }}>
          {props.boldcontents && (
            <BoldCOntents>{props.boldcontents}</BoldCOntents>
          )}
          {props.underlinecontents && (
            <UnderLineContents>
              {props.underlinecontents}
            </UnderLineContents>
          )}
          {props.contents && <Contents>{props.contents}</Contents>}
          {props.subContents &&
            props.subContents.map((data, i) => (
              <View
                key={i}
                style={{ marginTop: 5, paddingRight: 20 }}
              >
                <SubTitleWrapper>
                  {data.subNumbering && (
                    <NumberingTextWrapper>
                      <LowContents>{data.subNumbering}</LowContents>
                    </NumberingTextWrapper>
                  )}
                  <View>
                    {data.subContents && (
                      <LowContents>{data.subContents}</LowContents>
                    )}
                  </View>
                </SubTitleWrapper>
              </View>
            ))}
        </View>
      </SubTitleWrapper>
    </Wrapper>
  )
}

export default SubContents
