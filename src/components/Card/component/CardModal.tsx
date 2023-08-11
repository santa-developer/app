import BottomModal from '@components/BottomModal'
import Button from '@components/Button'
import Text from '@components/Text'
import { Colors, Dev } from '@constants'
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import IconEdit from '@images/svg/IconEdit.svg'
import IconTrash from '@images/svg/IconTrash.svg'
import IconUserPlus from '@images/svg/IconUserPlus.svg'
import IconUserX from '@images/svg/IconUserX.svg'
import IconCopy from '@images/svg/IconCopy.svg'
import IconShare from '@images/svg/IconShare.svg'
import IconSend from '@images/svg/IconSend.svg'
import IconMonitor from '@images/svg/IconMonitor.svg'
import IconEyeOff from '@images/svg/IconEyeOff.svg'
import IconAlertCircle from '@images/svg/IconAlertCircle.svg'
import BLTB from '@models/Common/BLTB'
import { useRecoilValue } from 'recoil'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import NavigationService from '@service/NavigationService'
import $t from 'i18n'

export default function CardModal({
  item,
  isModal,
  onClosePress,
}: {
  item?: BLTB
  isModal: boolean
  onClosePress: () => void
}): JSX.Element {
  const myInfo = useRecoilValue(loginedUserInfoState)
  const isMyFeed = item?.mebrMgmtNmbr === myInfo.mebrMgmtNmbr

  const [isFollow, setIsFollow] = useState(false)

  const handleModalOffPress = (): void => {
    onClosePress()
  }

  return (
    <BottomModal
      onBackdropPress={handleModalOffPress}
      isVisible={isModal}
      modalHeight={isMyFeed ? '68%' : '60%'}
      backgroundColor={Colors.modalBg}
    >
      <View style={{ width: '100%', marginTop: 10 }}>
        {isMyFeed && (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              gap: 15,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: Colors.wh,
                borderRadius: 10,
                paddingVertical: 12,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                flexDirection: 'column',
                flex: 1,
              }}
            >
              <IconEdit />
              <Text>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: Colors.wh,
                borderRadius: 10,
                paddingVertical: 12,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                flexDirection: 'column',
                width: '50%',
                flex: 1,
              }}
            >
              <IconTrash />
              <Text>삭제</Text>
            </TouchableOpacity>
          </View>
        )}
        <Button
          onPress={(): void => setIsFollow((prev) => !prev)}
          buttonType="normal"
          buttonStyle={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            paddingHorizontal: 20,
            marginTop: 15,
            borderRadius: 10,
          }}
        >
          {isFollow ? (
            <IconUserPlus stroke={Colors.active} />
          ) : (
            <IconUserX stroke={Colors.bl} />
          )}
          <Text color={isFollow ? Colors.active : Colors.bl}>
            {isFollow ? '팔로우' : '팔로우 취소'}
          </Text>
        </Button>
        <View>
          <Button
            onPress={(): void => Dev.log('sdkfj')}
            buttonType="normal"
            buttonStyle={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              paddingHorizontal: 20,
              marginTop: 15,
              borderTopStartRadius: 10,
              borderTopEndRadius: 10,
            }}
          >
            <IconCopy />
            <Text>링크복사</Text>
          </Button>
          <Button
            onPress={(): void => Dev.log('sdkfj')}
            buttonType="normal"
            buttonStyle={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              paddingHorizontal: 20,
              borderRadius: 0,
              borderWidth: 1,
              borderColor: Colors.bg1,
            }}
          >
            <IconShare stroke={Colors.bl} />
            <Text>공유하기</Text>
          </Button>

          <Button
            onPress={(): void => Dev.log('sdkfj')}
            buttonType="normal"
            buttonStyle={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              paddingHorizontal: 20,
              borderRadius: 0,
              borderBottomStartRadius: 10,
              borderBottomEndRadius: 10,
            }}
          >
            <IconSend />
            <Text>DM으로 공유하기</Text>
          </Button>
        </View>
        <Button
          onPress={(): void => Dev.log('sdkfj')}
          buttonType="normal"
          buttonStyle={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            paddingHorizontal: 20,
            marginTop: 15,
            borderRadius: 10,
          }}
        >
          <IconMonitor />
          <Text>원글보기</Text>
        </Button>
        <View
          style={{
            marginTop: 15,
          }}
        >
          <Button
            onPress={(): void => Dev.log('sdkfj')}
            buttonType="normal"
            buttonStyle={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              paddingHorizontal: 20,
              borderTopStartRadius: 10,
              borderTopEndRadius: 10,
            }}
          >
            <IconEyeOff />
            <Text>게시글 숨기기</Text>
          </Button>
          <Button
            onPress={(): void => {
              onClosePress()
              NavigationService.push('Declare', {
                reportId: item?.postMgmtNmbr,
                code: 'DEC_COTT_DVSN_CODE',
                title: $t('COMM.COMM_WORD_35'),
              })
            }}
            buttonType="normal"
            buttonStyle={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              paddingHorizontal: 20,
              borderBottomStartRadius: 10,
              borderBottomEndRadius: 10,
              borderTopColor: Colors.bg1,
              borderTopWidth: 1,
            }}
          >
            <IconAlertCircle stroke={Colors.error} />
            <Text color={Colors.error}>신고</Text>
          </Button>
        </View>
      </View>
    </BottomModal>
  )
}
