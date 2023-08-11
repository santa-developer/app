import ImageUtils from '@utils/ImageUtils'
import React, { useState } from 'react'
import { CardProps } from '../CardModel'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import Text from '@components/Text'
import _ from 'lodash'
import { Colors } from '@constants'
import { getViewDateFromNow } from '@utils/timesUtils'
import IconMore from '@images/svg/IconMore.svg'
import NavigationService from '@service/NavigationService'
import CardModal from './CardModal'
import { useRecoilValue } from 'recoil'
import { homeLocationState } from '@recoil/atoms/Home/home'

export default function CardUserInfo({
  item,
}: CardProps): JSX.Element {
  const [isModal, setIsModal] = useState(false)
  const homeLocation = useRecoilValue(homeLocationState)

  const handleProfilePress = (): void => {
    if (homeLocation === 'HABL') {
      NavigationService.push('MypageHome', {
        mebrMgmtNmbr: item?.mebrMgmtNmbr,
      })
    } else {
      // 스페이스 관련 이동 페이지 추가
    }
  }

  const handleModalPress = (): void => {
    setIsModal(true)
  }

  const handleModalOffPress = (): void => {
    setIsModal(false)
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.infoWrap}>
          <TouchableOpacity
            style={styles.info}
            activeOpacity={0.7}
            onPress={handleProfilePress}
          >
            <Image
              style={styles.icon}
              source={ImageUtils.getImageSource({
                id: item?.mebrFileMgmtNmbr,
                type: 'feedProfile',
                size: 200,
              })}
            />
            <View style={styles.nameText}>
              <Text color={Colors.bl} size={16}>
                {item?.userId}
              </Text>
              {homeLocation === 'SPACE' && (
                <Text color={Colors.active}>{item?.hispName}</Text>
              )}
            </View>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 3,
              marginLeft: 10,
              justifyContent: _.some(item?.hispMgmtNmbr)
                ? 'flex-start'
                : 'center',
            }}
          >
            <Text color={Colors.nagative} size={13}>
              {getViewDateFromNow(item?.regdatetime)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleModalPress}
        >
          <IconMore />
        </TouchableOpacity>
      </View>
      <CardModal
        item={item}
        isModal={isModal}
        onClosePress={handleModalOffPress}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  infoWrap: {
    flexDirection: 'row',
  },
  info: {
    flexDirection: 'row',
  },
  nameText: {
    justifyContent: 'center',
    marginLeft: 8,
  },
  icon: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: Colors.bg1,
    borderRadius: 50,
  },
})
