import Body from '@components/Body'
import { BottomButtonOne } from '@components/BottomButton'
import RadioButton from '@components/RadioButton'
import TextInput from '@components/TextInput'
import { Dev } from '@constants'
import { useAlert } from '@hooks/useCommonAlert'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'

export default function DeclarationScreen(): JSX.Element {
  const alert = useAlert()
  const [decValue, setDecValue] = useState('')
  const [reason, setReason] = useState('')

  const decInfo = [
    {
      value: '01',
      desc: '부적절한 콘텐츠를 게시합니다.',
    },
    {
      value: '02',
      desc: '다른 사람을 사칭하는 계정입니다.',
    },
    {
      value: '03',
      desc: '사용자가 만 12세 미만일 수 있습니다.',
    },
    {
      value: '04',
      desc: '저작권 침해 또는 상표 침해 계정입니다.',
    },
    {
      value: '05',
      desc: '반복 컨텐츠를 게시합니다.',
    },
    {
      value: '99',
      desc: '기타',
    },
  ]

  const handleChange = (text: string): void => {
    setReason(text)
  }

  useEffect(() => {
    setDecValue('')
    setReason('')
  }, [])

  return (
    <Body
      scrollable
      bottomComponent={
        <BottomButtonOne
          text="신고하기"
          buttonType={decValue ? 'active' : 'enabled'}
          onPress={(): void => {
            if (decValue === '99' && _.isEmpty(reason)) {
              alert({ desc: '사유를 입력하세요.' })
              return
            }
            Dev.log('신고이벤트')
          }}
        />
      }
    >
      <Wrapper>
        {decInfo.map((info) => {
          return (
            <RadioContainer key={info.value} type={info.value}>
              <RadioButton
                checked={decValue === info.value}
                onPress={(): void => setDecValue(info.value)}
                desc={info.desc}
              />
            </RadioContainer>
          )
        })}
        {decValue === '99' && (
          <TextInputStyle
            value={reason}
            multiline
            numberOfLines={10}
            onChangeText={handleChange}
            placeholder="사유를 입력하세요.(필수)"
          />
        )}
      </Wrapper>
    </Body>
  )
}

const Wrapper = styled.View`
  margin-top: 30px;
`
const RadioContainer = styled.View<{ type: string }>`
  margin-bottom: ${(props): string =>
    props.type !== '99' ? '20px' : '10px'};
`
const TextInputStyle = styled(TextInput)`
  height: 110px;
`
