import Text from '@components/Text'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import Linkify from 'linkify-it'
import { Colors } from '@constants'
import NavigationService from '@service/NavigationService'
import _ from 'lodash'
import { hyperLinkProps } from './HyperlinkModel'

export default function HyperlinkScreen(
  props: hyperLinkProps
): JSX.Element {
  const { onLinkPress, children } = props
  const linkify = new Linkify()

  useEffect(() => {
    linkify.add('@', {
      validate: (
        text: string,
        pos: number,
        self: any
      ): boolean | number => {
        const tail = text.slice(pos)
        if (!self.re.twitter) {
          self.re.twitter = new RegExp(
            '^([a-zA-Z0-9_.]){1,50}(?!_)(?=$|' +
              self.re.src_ZPCc +
              ')'
          )
        }
        if (self.re.twitter.test(tail)) {
          if (pos >= 2 && tail[pos - 2] === '@') {
            return false
          }
          return tail.match(self.re.twitter)?.[0].length || 0
        }
        return 0
      },
    })
    linkify.add('#', {
      validate: (text: string, pos: number): boolean | number => {
        const tail = text.slice(pos)
        const regexp = new RegExp(
          '^([a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]){1,50}'
        )

        if (regexp.test(tail)) {
          if (pos >= 2 && tail[pos - 2] === '#') {
            return false
          }
          return tail.match(regexp)?.[0].length || 0
        }
        return 0
      },
    })
  }, [])

  return (
    <Hyperlink
      linkStyle={{ color: Colors.hashtag }}
      linkify={linkify}
      onPress={(text: string): void => {
        onLinkPress && onLinkPress()
        if (text.indexOf('@') >= 0) {
          NavigationService.push('MypageHome', {
            userId: _.trimEnd(_.split(text, '@')[1]),
          })
        } else if (text.indexOf('#') >= 0) {
          //   CommonSearchStore.initStore()
          //   CommonSearchStore.showDefaultScreen = false
          //   NavigationService.push('CommonSearch', {
          //     selectedTab: 'tag',
          //     srchWord: _.trimEnd(_.split(text, '#')[1]),
          //   })
        } else {
          //   Alert.confirm({
          //     desc:
          //       // '알수없는 링크를 열면 디바이스와 개인 데이터의 보안이 위험할 수 있습니다. 링크를 연 후 발생할 수 있는 디바이스 및 데이터 손상에 대한 책임은 모두 사용자에게 있습니다.',
          //       $t('COMM.COMM_STC_ASK_LINK'),
          //     onPressConfirm: async () => {
          //       if (await Linking.canOpenURL(text)) {
          //         Linking.openURL(text)
          //       }
          //     },
          //   })
        }
      }}
    >
      <View>
        {children}
        <Text>
          {/* </Text>
        <Text
          size={13}
          bold={'500'}
          style={{
            lineHeight: 17,
            color: '#333',
          }}
          mebrMgmtNmbr={comt.reguserid}
        >
          {comt.userId}
        </Text>
        f
        <Text
          size={13}
          style={styles.comtCott}
          // selectable={true}
          // value={'   ' + comt.comtCott}
        >
          {'   ' + comt.comtCott}
        */}
        </Text>
      </View>
    </Hyperlink>
  )
}
