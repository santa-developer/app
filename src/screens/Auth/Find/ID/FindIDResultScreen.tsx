import Body from '@components/Body'
import { BottomButtonVarious } from '@components/BottomButton'
import Text from '@components/Text'
import { Colors } from '@constants'
import { FindUserInfoState } from '@recoil/atoms/Auth/find'
import NavigationService from '@service/NavigationService'
import ImageUtils from '@utils/ImageUtils'
import $t from 'i18n'
import React, { useState } from 'react'
import { ImageSourcePropType } from 'react-native'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import styled from 'styled-components/native'

function FindIDResult(): React.JSX.Element {
  const { userId, mebrFileMgmtNmbr } =
    useRecoilValue(FindUserInfoState)
  const resetUserInfo = useResetRecoilState(FindUserInfoState)
  const [imageSource] = useState<ImageSourcePropType>(
    ImageUtils.getImageSource({
      id: mebrFileMgmtNmbr,
      size: 200,
      type: 'user',
    })
  )

  return (
    <Wrapper
      bottomComponent={
        <BottomButtonVarious
          item={[
            {
              // text: '비밀번호 재설정',
              text: $t('MP.MP_WORD_15'),
              onPress: (): void => {
                resetUserInfo()
                NavigationService.navigate('FindPW')
              },
              buttonStyle: {
                backgroundColor: Colors.wh,
                borderColor: Colors.nagative,
                borderWidth: 1,
              },
              textStyle: { color: Colors.nagative },
            },
            {
              // text: '로그인',
              text: $t('USER.USER_WORD_LOGIN'),
              onPress: (): void => {
                resetUserInfo()
                NavigationService.navigate('Auth')
              },
              buttonType: 'active',
            },
          ]}
        />
      }
    >
      <Container>
        <ProfileImg source={imageSource} />
        <ProfileText>
          {/* todo: 다국어 */}
          고객님께서{'\n'}가입하신 아이디 입니다.
        </ProfileText>
        <IdTextBox>
          <IdText selectable={true}>{userId}</IdText>
        </IdTextBox>
      </Container>
    </Wrapper>
  )
}

export default FindIDResult

/**
 * navigation 옵션
 */
FindIDResult.navigationOptions = {
  headerShown: false,
}

const Wrapper = styled(Body)`
  flex: 1;
  justify-content: center;
  width: 100%;
  height: 100%;
`
const Container = styled.View`
  flex: 1;
  justify-content: center;
  height: 100%;
  margin-top: 30px;
  margin-bottom: 25px;
  align-items: center;
`
export const ProfileImg = styled.Image`
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
const IdTextBox = styled.View`
  margin-top: 30px;
  margin-bottom: 50px;
  padding: 30px;
  text-align: center;
  background-color: ${Colors.bg1};
  width: 100%;
`
const IdText = styled(Text)`
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  text-align: center;
  color: ${Colors.pu};
  width: 100%;
`
