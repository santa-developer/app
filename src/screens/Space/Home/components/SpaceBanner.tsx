import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import IconMegaphone from '@images/svg/IconMegaphone.svg'
import { Colors } from '@constants'
import Text from '@components/Text'
import NavigationService from '@service/NavigationService'

/**
 * 배너 공지사항
 */
export default function SpaceBanner(): JSX.Element {
  return (
    <TouchableOpacity
      style={{
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.active,
        borderRadius: 40,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        gap: 10,
      }}
      onPress={(): void =>
        NavigationService.navigate('SpaceAnnounce')
      }
    >
      <View
        style={{
          backgroundColor: Colors.wh,
          padding: 6,
          borderRadius: 30,
        }}
      >
        <IconMegaphone width={30} height={30} />
      </View>
      <Text color={Colors.wh} size={14} bold="400">
        스페이스 운영자 보상이 없어졌어요 :(
      </Text>
    </TouchableOpacity>
  )
}
