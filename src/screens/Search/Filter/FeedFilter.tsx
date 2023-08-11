import Text from '@components/Text'
import React from 'react'
import styled from 'styled-components/native'
import { Colors, Dev } from '@constants'
import Button from '@components/Button'
import IconRotateCw from '@components/Images/Icon/IconRotateCw'
import BottomModal from '@components/BottomModal'

interface FilterProps {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Filter(
  props: FilterProps
): React.JSX.Element {
  const { isVisible, setIsVisible } = props
  return (
    <BottomModal
      isVisible={isVisible}
      onBackdropPress={(): void => setIsVisible(false)}
      modalHeight={'34%'}
    >
      <FilterWrap>
        <FilterTopWrap>
          <Text size={18} bold="700">
            필터
          </Text>
          <InitialBtnWrap>
            <IconRotateCw />
            <Text color={Colors.disabled} style={{ marginLeft: 5 }}>
              초기화
            </Text>
          </InitialBtnWrap>
        </FilterTopWrap>
        <OptionsWrap>
          <Option>
            <Text color={Colors.active}>전체</Text>
          </Option>
          <Option>
            <Text color={Colors.nagative}>내피드</Text>
          </Option>
          <Option>
            <Text color={Colors.nagative}>팔로워</Text>
          </Option>
        </OptionsWrap>
        <OptionsWrap>
          <Option>
            <Text color={Colors.active}>최신순</Text>
          </Option>
          <Option>
            <Text color={Colors.nagative}>인기순</Text>
          </Option>
        </OptionsWrap>
        <Button
          text={'적용하기'}
          buttonType={'active'}
          onPress={function (): void {
            Dev.log('적용하기')
            setIsVisible(false)
          }}
          style={{ marginTop: 25 }}
        />
      </FilterWrap>
    </BottomModal>
  )
}

const FilterWrap = styled.View`
  background-color: ${Colors.wh};
  width: 100%;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
`

const FilterTopWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`

const InitialBtnWrap = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const OptionsWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`

const Option = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${Colors.active};
  border-radius: 50px;
  padding: 6px 22px;
  margin-right: 5px;
`
