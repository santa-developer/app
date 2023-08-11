import Body from '@components/Body'
import { BottomButtonOne } from '@components/BottomButton'
import Text from '@components/Text'
import { Colors } from '@constants'
import { FindUserInfoState } from '@recoil/atoms/Auth/find'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import NavigationService from '@service/NavigationService'
import ImageUtils from '@utils/ImageUtils'
import $t from 'i18n'
import React from 'react'
import { View } from 'react-native'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import styled from 'styled-components/native'

/**
 * todo: 다국어 처리
 * @returns
 */
function FindPWResult(): React.JSX.Element {
  const { userId, mebrFileMgmtNmbr } = useRecoilValue(
    loginedUserInfoState
  )
  const resetFindUserInfo = useResetRecoilState(FindUserInfoState)
  return (
    <Wrapper
      bottomComponent={
        <BottomButtonOne
          // text={'로그인'}
          text={$t('USER.USER_WORD_LOGIN')}
          onPress={(): void => {
            resetFindUserInfo()
            NavigationService.navigate('Auth')
          }}
          buttonType="active"
        />
      }
    >
      <View>
        <Container>
          <ProfileImg
            source={ImageUtils.getImageSource({
              id: mebrFileMgmtNmbr,
              size: 200,
              type: 'user',
            })}
          />
          <ProfileText>
            {/* todo: 다국어 처리 */}
            <UserIdText>{$t('USER.USER_WORD_10', userId)}</UserIdText>
            {'\n'}
            {$t('USER.USER_STC_06')}
            {'\n'}
            {$t('MP.MP_STC_16')}
          </ProfileText>
        </Container>
      </View>
    </Wrapper>
  )
}

export default FindPWResult

/**
 * navigation 옵션
 */
FindPWResult.navigationOptions = {
  headerShown: false,
}

const Wrapper = styled(Body)`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
  flex: 1;
`
const Container = styled.View`
  margin-top: 30px;
  margin-bottom: 25px;
  align-items: center;
`
const ProfileImg = styled.Image`
  height: 84px;
  width: 84px;
  border-radius: 42px;
`
const ProfileText = styled(Text)`
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
  margin-top: 30px;
  margin-bottom: 50px;
  text-align: center;
`
const UserIdText = styled(Text)`
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
  color: ${Colors.pu};
`
