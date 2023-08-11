import React from 'react'
import { View } from 'react-native'
import Text from '@components/Text'
import { Colors } from '@constants'

interface IProps {
  children: string
}

/**
 * 해당 금액이 어떠한 금액인지를 알려주는 marker
 * @returns
 */
export function HIBSMarker({ children = '' }: IProps): JSX.Element {
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor: Colors.active,
        paddingVertical: 5,
        paddingHorizontal: 12,
        shadowColor: Colors.bl,
        borderRadius: 50,
        marginRight: 10,
      }}
    >
      <Text
        color={Colors.wh}
        size={12}
        style={{
          shadowColor: Colors.bl,
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 4 },
        }}
      >
        {children}
      </Text>
    </View>
  )
}

interface IText {
  children: string
  size?: number
}

/**
 * 현재 보유한 HIBS 금액
 * @returns
 */
export const OwnHIBSAmount = ({
  children = '0',
  size,
}: IText): React.JSX.Element => (
  <Text size={size} bold="500">
    {children} HIBS
  </Text>
)

/**
 * 송금하려는 HIBS 금액
 * @returns
 */
export const SendingHIBSAmount = ({
  children = '0',
}: IText): React.JSX.Element => (
  <Text size={38} bold="500">
    {children} HIBS
  </Text>
)

/**
 * 현재 HIBS 환율
 * @returns
 */
export const HIBSexchange = ({
  wonTohips,
  won,
}: {
  wonTohips: string
  won: string
}): React.JSX.Element => (
  <Text size={14} color={Colors.nagative}>
    {wonTohips}원{<Text color={Colors.active}> (1HIBS={won}원)</Text>}
  </Text>
)
