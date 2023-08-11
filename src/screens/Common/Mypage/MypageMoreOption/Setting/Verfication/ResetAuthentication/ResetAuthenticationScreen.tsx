import Body from '@components/Body'
import { BottomButtonOne } from '@components/BottomButton'
import Text from '@components/Text'
import { Images, Layout } from '@constants'
import NavigationService from '@service/NavigationService'
import $t from 'i18n'
import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components'

/**
 * 인증 비밀번호 재설정
 * @returns
 */
function ResetAuthenticationScreen(): React.JSX.Element {
  const imageWidth = Layout.window.width - 90

  return (
    <Wrapper
      bottomComponent={
        <BottomButtonOne
          text={$t('USER.USER_WORD_29')}
          buttonType="active"
          onPress={(): void =>
            NavigationService.navigate('ResetAuthenticationSms')
          }
        />
      }
    >
      <Image
        source={Images.gif.womanSendingSecureMessages}
        style={{
          width: imageWidth,
          height: imageWidth - 30,
          marginVertical: 30,
        }}
      />
      <Description>{$t('WALT.WALT_STC_30')}</Description>
    </Wrapper>
  )
}

export default ResetAuthenticationScreen

const Wrapper = styled(Body)`
  flex-direction: column;
  align-items: center;
`
const Description = styled(Text)`
  font-size: 20px;
  width: 210px;
  text-align: center;
  line-height: 30px;
`
