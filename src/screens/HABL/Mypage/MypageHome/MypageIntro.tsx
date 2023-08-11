import Button from '@components/Button'
import IconLink from '@images/svg/IconLink.svg'
import Text from '@components/Text'
import Hr from '@components/Hr'
import { Colors, Dev } from '@constants'
import React, { useEffect, useState } from 'react'
import { Linking, StyleSheet } from 'react-native'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import styled from 'styled-components/native'
import { useAlert } from '@hooks/useCommonAlert'
import ImageUtils from '@utils/ImageUtils'
import _ from 'lodash'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import { trackingMypageInfoState } from '@recoil/atoms/Mypage/mypage'
import MEBR from '@models/MEBR'
import { MyPageCntProps } from '@models/Common/MYPAGE_CNT'
import { IMypage } from '@models/Mypage/MYPAGE'
import { nFormatter } from '@utils/NumberUtils'
import NavigationService from '@service/NavigationService'
import { KYCModal, initKYCInfo } from '@recoil/atoms/KYC/kyc'

export default function MypageIntro({
  mebrMgmtNmbr,
}: IMypage): JSX.Element {
  const [isIntru, setIsIntro] = useState(false)
  const [isFollow, setIsFollow] = useState(false)
  const [isMyPage, setIsMypage] = useState(true)
  const [userInfo, setUserInfo] = useState<MEBR>()
  const [cntInfo, setCntInfo] = useState<MyPageCntProps>()

  // kyc 정보
  const kycInfo = useRecoilValue(initKYCInfo)
  const setIsKycModal = useSetRecoilState(KYCModal)

  const myInfo = useRecoilValue(loginedUserInfoState) // 내정보 가져오기
  const trackingMypageInfo = useRecoilValue(trackingMypageInfoState)

  const alert = useAlert()

  useEffect(() => {
    const mypageInfo = trackingMypageInfo[mebrMgmtNmbr]

    if (mypageInfo) {
      setUserInfo(mypageInfo.userInfo)
      setCntInfo(mypageInfo.cntInfo)

      setIsIntro(
        _.some(mypageInfo.userInfo?.userInf) ||
          _.some(mypageInfo.userInfo?.webUrl)
      )
    }

    setIsMypage(mebrMgmtNmbr === myInfo.mebrMgmtNmbr)
  }, [mebrMgmtNmbr])

  const handleLinkClick = async (): Promise<void> => {
    const supported = await Linking.canOpenURL(userInfo?.webUrl || '')
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(userInfo?.webUrl || '')
    } else {
      alert({
        desc: `Don't know how to open this URL: ${userInfo?.webUrl}`,
      })
    }
  }

  const handleNavigation = (followType: string) => (): void => {
    // 팔로잉, 팔로워, 좋아요 대상자 목록
    NavigationService.push('MypageFollow', {
      followType,
      userInfo,
      cntInfo,
    })
  }

  return (
    <>
      {userInfo && cntInfo && (
        <IntroWrap>
          <ProfileContainer>
            <Profile style={styles.shadow}>
              <ProfileImg
                source={ImageUtils.getImageSource({
                  type: 'userSquare',
                  id: userInfo?.mebrFileMgmtNmbr,
                  size: 200,
                })}
                resizeMode={'cover'}
              />
            </Profile>
          </ProfileContainer>
          <MyFollowContainer>
            <MyFollowWrapper onPress={handleNavigation('following')}>
              <Text bold="700" size={18}>
                {nFormatter(cntInfo?.followingCnt || 0)}
              </Text>
              <MyFollowText size={12} bold={'400'}>
                팔로잉
              </MyFollowText>
            </MyFollowWrapper>
            <MyFollowSeparator />
            <MyFollowWrapper onPress={handleNavigation('follower')}>
              <Text bold="700" size={18}>
                {nFormatter(cntInfo?.followerCnt || 0)}
              </Text>
              <MyFollowText size={12} bold={'400'}>
                팔로워
              </MyFollowText>
            </MyFollowWrapper>
            <MyFollowSeparator />
            <MyFollowWrapper onPress={handleNavigation('like')}>
              <Text bold="700" size={18}>
                {nFormatter(cntInfo?.voteCnt || 0)}
              </Text>
              <MyFollowText size={12} bold={'400'}>
                좋아요
              </MyFollowText>
            </MyFollowWrapper>
          </MyFollowContainer>
          {!isMyPage && (
            <ButtonContainer>
              <Button
                text="팔로잉"
                style={{ flex: 0.6 }}
                buttonStyle={{
                  backgroundColor: isFollow
                    ? Colors.wh
                    : Colors.active,
                  borderColor: Colors.active,
                  borderWidth: isFollow ? 1 : 0,
                  paddingVertical: isFollow ? 8 : 9,
                  paddingHorizontal: isFollow ? 11 : 12,
                }}
                textStyle={{
                  color: isFollow ? Colors.active : Colors.wh,
                }}
                onPress={(): void => {
                  setIsFollow((isFollow) => !isFollow)
                  Dev.log('팔로잉')
                }}
              />
              <Button
                text="송금"
                style={{ flex: 0.2 }}
                buttonStyle={{
                  backgroundColor: Colors.pu2,
                  paddingVertical: 9,
                  paddingHorizontal: 12,
                }}
                textStyle={{
                  color: Colors.active,
                }}
                onPress={(): void => {
                  if (kycInfo.kycLevel < 5) setIsKycModal(true)
                  else if (kycInfo.kycLevel === 5) Dev.log('송금')
                }}
              />
              {isFollow && (
                <Button
                  text="DM"
                  style={{ flex: 0.2 }}
                  buttonStyle={{
                    backgroundColor: Colors.info,
                    paddingVertical: 9,
                    paddingHorizontal: 12,
                  }}
                  textStyle={{ color: Colors.bl }}
                  onPress={(): void => Dev.log('DM')}
                />
              )}
            </ButtonContainer>
          )}
          <Hr />
          {isIntru && (
            <IntroduceContainer>
              <Introduce>
                <IntroduceText>{userInfo?.userInf}</IntroduceText>
              </Introduce>
              {userInfo?.webUrl && (
                <IntroduceLink onPress={handleLinkClick}>
                  <IconLink />
                  <IntroduceWeb>{userInfo?.webUrl}</IntroduceWeb>
                </IntroduceLink>
              )}
            </IntroduceContainer>
          )}
        </IntroWrap>
      )}
    </>
  )
}

const IntroWrap = styled.View`
  background-color: ${Colors.wh};
`

const ProfileContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
`

const Profile = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.wh};
  padding-right: 15px;
  padding-left: 15px;
`
const ProfileImg = styled.Image`
  width: 71.25px;
  height: 71.25px;
  border-radius: 50px;
`

const MyFollowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-right: 15px;
  padding-left: 15px;
  margin-bottom: 20px;
`
const MyFollowWrapper = styled.TouchableOpacity`
  align-items: center;
`

const MyFollowText = styled(Text)`
  margin-top: 10px;
  color: ${Colors.nagative};
`

const MyFollowSeparator = styled.View`
  border-width: 1px;
  height: 20px;
  border-color: ${Colors.disabled};
`

const ButtonContainer = styled.View`
  flex-direction: row;
  padding: 0 15px;
  gap: 10px;
  width: 100%;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`

const IntroduceContainer = styled.View`
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 20px;
  padding-bottom: 20px;
`
const Introduce = styled.View`
  margin-bottom: 20px;
`
const IntroduceText = styled(Text)``
const IntroduceLink = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`
const IntroduceWeb = styled(Text)`
  color: ${Colors.point};
  margin-left: 5px;
`

const styles = StyleSheet.create({
  shadow: {
    shadowColor: Colors.bl,
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 5,
    shadowOffset: { width: 0, height: 1 },
  },
})
