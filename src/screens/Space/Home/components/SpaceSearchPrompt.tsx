import React, { useState } from 'react'
import Text from '@components/Text'
import styled from 'styled-components/native'
import Icon from 'react-native-fontawesome-pro'
import { TouchableOpacity } from 'react-native'
import { Colors } from '@constants'

/**
 * 스페이스 검색 프롬프트
 */
export default function SpaceSearchPrompt(): React.JSX.Element {
  const [search, setSearch] = useState<string>('')

  const clearBtn = (): void => {
    setSearch('')
  }
  return (
    <>
      <SearchHeaderWrap>
        <InputWrap>
          <Icon
            name="magnifying-glass"
            size={18}
            type="regular"
            color={Colors.disabled}
          />
          <SearchInput
            style={{ backgroundColor: Colors.bg1 }}
            placeholder="검색어를 입력하세요."
            placeholderTextColor={Colors.disabled}
            value={search}
            onChangeText={(text: string): void => {
              setSearch(text)
            }}
          />
        </InputWrap>
        <TouchableOpacity onPress={clearBtn}>
          <Text size={14} color={Colors.active}>
            취소
          </Text>
        </TouchableOpacity>
      </SearchHeaderWrap>
    </>
  )
}

const SearchHeaderWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`

const InputWrap = styled.View`
  margin-right: 10px;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.bg1};
  padding: 12px 20px;
  border-radius: 50px;
  flex: 1;
`

const SearchInput = styled.TextInput`
  margin-left: 10px;
  font-size: 14px;
`
