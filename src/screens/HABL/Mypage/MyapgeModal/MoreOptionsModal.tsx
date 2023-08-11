import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { Colors } from '@constants'
import { TouchableOpacity, View, Image } from 'react-native'
import Text from '@components/Text'
import NavigationService from '@service/NavigationService'
import { isMoreOptionState } from '@recoil/atoms/Mypage/mypage'
import { useRecoilState, useSetRecoilState } from 'recoil'
import IconHouse from '@images/svg/IconHouse.svg'
import IconTrophy from '@images/svg/IconTrophy.svg'
import IconImage from '@images/svg/IconImage.svg'
import IconShoppingBag from '@images/svg/IconShoppingBag.svg'
import IconSpaceExploration from '@images/svg/IconSpaceExploration.svg'
import IconRanking from '@images/svg/IconRanking.svg'
import IconWallet from '@images/svg/IconWallet.svg'
import IconCoin from '@images/svg/IconCoin.svg'
import IconMessage from '@images/svg/IconMessage.svg'
import IconSettings from '@images/svg/IconSettings.svg'
import IconXmark from '@components/Images/Icon/IconXmark'
import IconChevron from '@components/Images/Icon/IconChevron'
import { homeLocationState } from '@recoil/atoms/Home/home'
import useAuthService from '@hooks/useAuthService'
import { useConfirm } from '@hooks/useCommonAlert'
import $t from 'i18n'
import { KYCModal, initKYCInfo } from '@recoil/atoms/KYC/kyc'
import { kyc } from '@api/kyc.api'
import { KYC_INFO } from '@models/KYC'
import Modal from 'react-native-modal'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import myPage from '@api/mypage.api'
import ImageUtils from '@utils/ImageUtils'
import dec from '@api/dec.api'

export default function MoreOptionsModal(props: {
  isVisible: boolean
  onBackdropPress?: () => void
  onBackButtonPress?: () => void
}): JSX.Element {
  const [loginedUserInfo] = useRecoilState(loginedUserInfoState)
  const { logout } = useAuthService()
  const setConfirm = useConfirm()
  const setIsMoreOption = useSetRecoilState(isMoreOptionState)
  const homeLocation = useSetRecoilState(homeLocationState)
  const { isVisible, onBackButtonPress, onBackdropPress } = props

  const controller = new AbortController()
  const [kycData, setKycData] = useRecoilState<KYC_INFO>(initKYCInfo) //kyc 정보
  const setIsKycModal = useSetRecoilState(KYCModal)

  const [totalPoint, setTotalPoint] = useState('0') // 내 포인트 정보
  const [isHunter, setIsHunter] = useState<string>() // 헌터 여부

  const menuData = [
    {
      icon: <IconHouse />,
      title: 'HABL',
      navigation: 'HomeMain',
    },
    {
      icon: <IconTrophy />,
      title: 'Challenge',
      navigation: 'HomeMain',
    },
    {
      icon: <IconImage />,
      title: 'NFT',
      navigation: 'HomeMain',
    },
    {
      icon: <IconShoppingBag />,
      title: 'SHOP',
      navigation: 'HomeMain',
    },
    {
      icon: <IconSpaceExploration />,
      title: 'SPACE',
      navigation: 'HomeMain',
    },
  ]

  const MyMenuData = [
    {
      icon: <IconRanking />,
      title: $t('COMM.COMM_WORD_06'),
      navigation: 'RankingScreen',
    },
    {
      icon: <IconWallet />,
      title: $t('COMM.COMM_WORD_WALLET'),
      navigation: 'Wallet',
    },
    {
      icon: <IconCoin />,
      title: $t('MP.MP_WORD_12'),
      navigation: 'RewardHistoryScreen',
    },
    {
      icon: <IconMessage />,
      title: '다이렉트 메시지',
      navigation: 'messHomeMainage',
    },
  ]

  const handlePageMove = (navigation: string): void => {
    setIsMoreOption(false)
    setTimeout(() => {
      NavigationService.push(navigation)
    }, 300)
  }

  /** 로그아웃 */
  const _handleLogout = (): void => {
    setIsMoreOption(false)
    setConfirm({
      title: $t('MP.MP_WORD_07'),
      desc: $t('MP.MP_STC_03'),
      onPressConfirm: async (): Promise<void> => {
        await logout()
      },
    })
  }

  // kyc 정보 업데이트
  const getKycMemberUpdate = async (): Promise<void> => {
    const result = await kyc.getKycHome.get({
      signal: controller.signal,
    })

    const { kycInfo } = result.response

    setKycData({ ...kycData, ...kycInfo })
  }

  // 내 포인트 확인 (금주누적 포인트)
  const getMemberPoint = async (): Promise<void> => {
    const result = await myPage.memberpoint.get({
      mebrMgmtNmbr: loginedUserInfo.mebrMgmtNmbr,
    })
    if (result.check) {
      setTotalPoint(result.response.totalPoint)
    }
  }

  // 헌터여부 확인하기
  const _loadHunterYn = async (): Promise<void> => {
    const result = await dec.hunter.post()
    if (result.check) {
      setIsHunter(result.response.weekHunterYn)
    }
  }

  useEffect(() => {
    getKycMemberUpdate()
    getMemberPoint()
    _loadHunterYn()
  }, [])

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}
      useNativeDriver={false}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
      animationInTiming={400}
      animationOutTiming={200}
      style={{
        margin: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}
    >
      <MoreOptionWrap>
        <View>
          {/* 상단 아이콘 */}
          <HeaderIconWrap>
            <TouchableOpacity
              onPress={(): void => handlePageMove('MypageSetting')}
            >
              <IconSettings />
            </TouchableOpacity>
            <TouchableOpacity>
              <IconXmark
                onPress={(): void => {
                  setIsMoreOption(false)
                }}
              />
            </TouchableOpacity>
          </HeaderIconWrap>
          {/* 상단 프로필 */}
          <ProfileInfoWrap>
            <ProfileInfo
              onPress={(): void => handlePageMove('EditMenuScreen')}
            >
              <ProfileImg>
                <Image
                  source={ImageUtils.getImageSource({
                    type: 'userSquare',
                    id: loginedUserInfo?.mebrFileMgmtNmbr,
                    size: 200,
                  })}
                  style={{
                    width: 45,
                    height: 45,
                  }}
                />
              </ProfileImg>
              <UserId size={20} bold={'500'}>
                {loginedUserInfo?.userId}
              </UserId>
              <ArrowRotateWrap>
                <IconChevron />
              </ArrowRotateWrap>
            </ProfileInfo>
            <HunterBadge
              onPress={(): void => {
                NavigationService.navigate('Activity')
                setIsMoreOption(false)
              }}
            >
              <Text
                size={12}
                color={isHunter === 'Y' ? Colors.wh : Colors.disabled}
              >
                {$t('COMM.COMM_WORD_HUNTER')}
              </Text>
            </HunterBadge>
          </ProfileInfoWrap>
          {/* 내 포인트 */}
          <PaddingWrap>
            <PointWrap
              activeOpacity={0.7}
              onPress={(): void => handlePageMove('MyPointScreen')}
            >
              <View>
                <Text size={14} color={Colors.wh}>
                  내 포인트
                </Text>
                <MyPoints size={20} bold={'500'} color={Colors.wh}>
                  {Number(totalPoint)} Point
                </MyPoints>
              </View>
              <KycBadge
                onPress={(): void => {
                  setIsMoreOption(false)

                  setTimeout(() => {
                    if (kycData.kycLevel < 5) setIsKycModal(true)
                  }, 300)
                }}
                style={{
                  backgroundColor:
                    kycData.kycLevel && kycData.kycLevel < 5
                      ? Colors.bg1
                      : Colors.wh,
                }}
              >
                <Text
                  size={12}
                  bold={'700'}
                  color={
                    kycData.kycLevel && kycData.kycLevel < 5
                      ? Colors.disabled
                      : Colors.active
                  }
                >
                  {kycData.kycLevel && kycData.kycLevel < 5
                    ? `KYC 인증 필요`
                    : `KYC 인증 완료`}
                </Text>
              </KycBadge>
            </PointWrap>
          </PaddingWrap>
          {/* 메뉴 이동 (홈, 챌린지, NFT, 샵, 스페이스) */}
          <MenuLinkWrap>
            {menuData.map((menu, index) => (
              <MenuContent
                key={index}
                onPress={(): void => {
                  homeLocation(
                    menu.title === 'HABL' ? 'HABL' : 'SPACE'
                  )
                  handlePageMove(menu.navigation)
                }}
              >
                {menu.icon}
                <MenuTitle size={14} color={Colors.nagative}>
                  {menu.title}
                </MenuTitle>
              </MenuContent>
            ))}
          </MenuLinkWrap>
          {/* 마이메뉴 이동(랭킹, 지갑, 보상내역, DM) */}
          <MyMenuWrap>
            {MyMenuData.map((myMenu, index) => (
              <MyMenuContent
                key={index}
                onPress={(): void =>
                  handlePageMove(myMenu.navigation)
                }
              >
                <MyMenuInfo>
                  {myMenu.icon}
                  <MyMenuTitle size={16}>{myMenu.title}</MyMenuTitle>
                </MyMenuInfo>
                <ArrowRotateWrap>
                  <IconChevron />
                </ArrowRotateWrap>
              </MyMenuContent>
            ))}
          </MyMenuWrap>
        </View>
        {/* 하단 정보 */}
        <BottomInfoWrap>
          <TouchableOpacity>
            <Text color={Colors.nagative}>
              {' '}
              {$t('COMM.COMM_WORD_NOTICE')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_handleLogout}>
            <Text color={Colors.nagative}>{$t('MP.MP_WORD_07')}</Text>
          </TouchableOpacity>
        </BottomInfoWrap>
      </MoreOptionWrap>
    </Modal>
  )
}

const MoreOptionWrap = styled.SafeAreaView`
  background-color: ${Colors.wh};
  width: 90%;
  height: 100%;
  position: relative;
  justify-content: space-between;
`

const PaddingWrap = styled.View`
  padding: 0 15px;
`

const HeaderIconWrap = styled.View`
  padding: 0px 15px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

const ProfileInfoWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
`

const ProfileInfo = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ProfileImg = styled.View`
  width: 45px;
  height: 45px;
  border-radius: 50px;
  overflow: hidden;
`

const UserId = styled(Text)`
  margin-left: 10px;
  margin-right: 10px;
`

const HunterBadge = styled.TouchableOpacity<{ isHunter?: string }>`
  background-color: ${(props): string =>
    props.isHunter === 'Y' ? Colors.staking : Colors.bg1};
  padding: 3px 13px;
  border-radius: 50px;
`

const PointWrap = styled.TouchableOpacity`
  padding: 20px;
  background-color: ${Colors.active};
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0 10px 0;
`

const MyPoints = styled(Text)`
  margin-top: 7px;
`

const KycBadge = styled.TouchableOpacity`
  padding: 3px 13px;
  border-radius: 50px;
  background-color: ${Colors.wh};
`

const MenuLinkWrap = styled.View`
  width: 100%;
  height: 60px;
  padding: 5px 15px;
  margin: 13px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`

const MenuContent = styled.TouchableOpacity`
  align-items: center;
  background-color: ${Colors.wh};
  width: 70px;
`

const MenuTitle = styled(Text)`
  margin-top: 5px;
`

const MyMenuWrap = styled.View`
  margin-top: 5px;
  padding: 15px 15px;
  border-top-width: 5px;
  border-top-color: ${Colors.bg1};
  border-bottom-width: 5px;
  border-bottom-color: ${Colors.bg1};
`

const MyMenuContent = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
`

const MyMenuInfo = styled.View`
  flex-direction: row;
  align-items: center;
`

const MyMenuTitle = styled(Text)`
  margin-left: 10px;
`

const BottomInfoWrap = styled.View`
  padding: 0px 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`
const ArrowRotateWrap = styled.View`
  transform: rotate(-90deg);
`
