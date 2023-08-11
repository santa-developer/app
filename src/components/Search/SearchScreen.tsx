import React from 'react'
import { Colors } from '@constants'
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SearchProps } from './SearchModel'
import IconSearch from '@images/svg/IconSearch.svg'
import IconClear from '@images/svg/IconClear.svg'

export default function SearchScreen(
  props: SearchProps
): JSX.Element {
  const {
    text,
    placeholder,
    onChangeText,
    onClear,
    onSearch,
    onFocus,
    onBlur,
  } = props

  return (
    <>
      <View style={styles.heaerWrap}>
        <View style={styles.inputConatiner}>
          <View style={styles.leftViw}>
            <IconSearch width={18} height={18} />
            <TextInput
              style={styles.searchInput}
              placeholder={placeholder || '검색어를 입력하세요.'}
              placeholderTextColor={Colors.disabled}
              value={text}
              onChangeText={(value): void => onChangeText(value)}
              onSubmitEditing={onSearch}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </View>
          <TouchableOpacity onPress={onClear}>
            <IconClear width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  heaerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  inputConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.bg1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 50,
    flex: 1,
  },
  leftViw: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 14,
    width: '80%',
    backgroundColor: Colors.bg1,
  },
})
