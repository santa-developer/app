import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { CheckBoxProps } from './CheckBoxModel'
import styled from 'styled-components/native'
import Icon from 'react-native-fontawesome-pro'
import { Colors } from '@constants'
import Text from '@components/Text'

export default function CheckBoxScreen(
  props: CheckBoxProps
): JSX.Element {
  const {
    title,
    checked,
    onPress,
    checkIcon,
    nonCheckIcon,
    bodyStyle,
    titleStyle,
    style,
  } = props

  return (
    <CheckBoxWrapper style={bodyStyle}>
      <CheckBox style={style} onPress={onPress}>
        {checked ? (
          checkIcon ? (
            checkIcon
          ) : (
            <Icon
              name="square-check"
              type="solid"
              size={18}
              color={Colors.pu}
            />
          )
        ) : nonCheckIcon ? (
          nonCheckIcon
        ) : (
          <Icon
            name="square"
            type="regular"
            size={18}
            color={'#ddd'}
          />
        )}
      </CheckBox>
      {title && (
        <TouchableWithoutFeedback onPress={onPress}>
          <View>
            {typeof title === 'string' ? (
              <TitleText style={titleStyle} checked={checked}>
                {title}
              </TitleText>
            ) : (
              <>{title}</>
            )}
          </View>
        </TouchableWithoutFeedback>
      )}
    </CheckBoxWrapper>
  )
}

const CheckBoxWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`
const CheckBox = styled.TouchableOpacity`
  border-radius: 5px;
  margin-right: 5px;
`
const TitleText = styled(Text)<{ checked: boolean }>`
  color: ${(props): string =>
    props.checked ? Colors.bl : Colors.disabled};
`
