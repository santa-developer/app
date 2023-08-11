import React from 'react'
import {
  // Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import styled from 'styled-components/native'
import IconXmark from '@images/svg/IconXmark.svg'
import Text from '@components/Text'

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

interface SubHeaderProps {
  numbering?: string
  title: string
}

export function TermsHeader({
  setIsModal,
}: {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element {
  return (
    // <View
    //   style={Platform.select({
    //     ios: {
    //       width: '100%',
    //       justifyContent: 'center',
    //       alignItems: 'flex-end',
    //       paddingVertical: 15,
    //     },
    //     default: {
    //       height: 30,
    //       paddingHorizontal: 20,
    //       marginTop: 30,
    //       width: '100%',
    //       justifyContent: 'center',
    //       alignItems: 'flex-end',
    //     },
    //   })}
    // >
    <HeaderBox>
      <TouchableWithoutFeedback
        onPress={(): void => {
          setIsModal(false)
        }}
      >
        <View
          style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
        >
          <IconXmark />
        </View>
      </TouchableWithoutFeedback>
    </HeaderBox>
  )
}

export function TermsHeaderTitle(props: {
  headerTitle: string
}): JSX.Element {
  return (
    <Header>
      <Title>{props.headerTitle}</Title>
    </Header>
  )
}

export function SubContents(props: Props): JSX.Element {
  return (
    <Wrapper>
      <SubTitleWrapper>
        {props.numbering && (
          <NumberingTextWrapper>
            <Text size={13}>{props.numbering}</Text>
          </NumberingTextWrapper>
        )}
        <View style={{ paddingRight: 20 }}>
          {props.boldcontents && (
            <Text size={13} bold={`bold`}>
              {props.boldcontents}
            </Text>
          )}
          {props.underlinecontents && (
            <UnderLineContents>
              {props.underlinecontents}
            </UnderLineContents>
          )}
          {props.contents && <Text size={13}>{props.contents}</Text>}
          {props.subContents &&
            props.subContents.map((data, i) => (
              <View
                key={i}
                style={{ marginTop: 5, paddingRight: 20 }}
              >
                <SubTitleWrapper>
                  {data.subNumbering && (
                    <NumberingTextWrapper>
                      {/* Low contents */}
                      <Text size={12}>{data.subNumbering}</Text>
                    </NumberingTextWrapper>
                  )}
                  <View>
                    {data.subContents && (
                      <Text size={12}>{data.subContents}</Text>
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

export function SubHeaderTitle(props: SubHeaderProps): JSX.Element {
  return (
    <SubHeaderWrapper>
      <SubHeaderTitleWrapper>
        {props.numbering && (
          <NumberingTextWrapper>
            <Text size={15} bold={'bold'}>
              {props.numbering}
            </Text>
          </NumberingTextWrapper>
        )}

        <Text size={15} bold={'bold'}>
          {props.title}
        </Text>
      </SubHeaderTitleWrapper>
    </SubHeaderWrapper>
  )
}

const HeaderBox = styled.View`
  width: 100%;
  padding-bottom: 10px;
`

const Header = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
`
const Title = styled.Text`
  font-weight: 700;
  font-size: 20px;
`

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

const UnderLineContents = styled.Text`
  font-size: 13px;
  text-decoration: underline;
`
const SubHeaderWrapper = styled.View`
  margin-top: 20px;
`
const SubHeaderTitleWrapper = styled.View`
  flex-direction: row;
`
