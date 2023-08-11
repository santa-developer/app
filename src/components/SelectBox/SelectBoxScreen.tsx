import React, { useRef } from 'react'
import { Keyboard, View } from 'react-native'
import { SelectBoxProps } from './SelectBoxModel'
import styled from 'styled-components/native'
import ReactNativePickerModule, {
  PickerRef,
} from 'react-native-picker-module'
import Icon from 'react-native-fontawesome-pro'
import Text from '@components/Text'
import _ from 'lodash'
import { Colors } from '@constants'

export default function SelectBoxScreen(
  props: SelectBoxProps
): React.JSX.Element {
  const width = props.width || 'auto'
  const {
    items,
    selectedValue,
    onValueChange,
    placeholder,
    disabled = false,
  } = props
  const pickerRef = useRef<PickerRef>(null)
  return (
    <View style={{ width }}>
      <SelectButton
        disabled={disabled}
        isEmpty={_.isEmpty(selectedValue)}
        onPress={(): void => {
          Keyboard.dismiss()
          pickerRef.current?.show()
        }}
      >
        <Text
          color={
            _.isEmpty(selectedValue) ? Colors.nagative : Colors.bl
          }
        >
          {!_.isEmpty(selectedValue)
            ? items.find((e) => e.value === selectedValue.value)
                ?.label
            : placeholder}
        </Text>
        <IconWrapper>
          <Icon
            name="chevron-down"
            size={10}
            type="light"
            color={
              _.isEmpty(selectedValue) ? Colors.nagative : Colors.bl
            }
          />
        </IconWrapper>
      </SelectButton>
      <ReactNativePickerModule
        items={items}
        value={selectedValue?.label}
        title={placeholder}
        onValueChange={(value): void => {
          const newValue = items.find((e) => e.value === value)
          onValueChange(newValue)
        }}
        ref={pickerRef}
      />
    </View>
  )
}

const SelectButton = styled.TouchableOpacity<{ isEmpty?: boolean }>`
  height: 50px;
  padding-left: 10px;
  background-color: white;
  border-radius: 5px;
  flex-direction: row;
  border-width: 1px;
  align-items: center;
  border-color: ${(props): string =>
    props.isEmpty ? Colors.disabled : Colors.nagative};
  color: ${(props): string =>
    props.isEmpty ? Colors.nagative : Colors.bl};
`
const IconWrapper = styled.View`
  margin-left: auto;
  margin-right: 10px;
`
