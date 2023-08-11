import * as React from 'react'
import Postcode from '@actbase/react-daum-postcode'
import Modal from 'react-native-modal'
import { Colors, Layout } from '@constants'
import { POST_DATA } from '@models/POST_CODE'
import { postCodeState } from '@recoil/atoms/postcode'
import { useRecoilState, useSetRecoilState } from 'recoil'
// import { postCodeSelector } from '@recoil/selectors/postcode'
import DefaultHeaderLeft from '@components/Header/CommonHeader/DefaultHeaderLeft'
import { alertPropsState } from '@recoil/atoms/alert'
import { Dimensions } from 'react-native'

export default function ChangeAddress({
  setIsModal,
}: {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element {
  // const { orderParam } = ShopPaymentStore
  const alert = useSetRecoilState(alertPropsState)
  const [selecAddress, setSelecAddress] =
    useRecoilState(postCodeState)

  const handleAddress = (data: POST_DATA): void => {
    const tempObj = selecAddress

    tempObj.reciAddress1 = `${data.zonecode}`
    tempObj.reciAddress2 = ``
    tempObj.reciAddress3 = ``

    // 사용자가 도로명 주소를 선택했을 경우
    if (data.userSelectedType === 'R') {
      tempObj.reciAddress2 = data.roadAddress

      // 법정동명이 있을 경우 추가한다. (법정리는 제외)
      // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        tempObj.reciAddress2 += ` (${data.bname})`
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          tempObj.reciAddress2 =
            data.bname !== ''
              ? `${tempObj.reciAddress2}, ${data.buildingName}`
              : `${data.buildingName}`
        }
      } else {
        tempObj.reciAddress3 = ''
      }
    } else {
      // 사용자가 지번 주소를 선택했을 경우(J)
      tempObj.reciAddress2 = data.jibunAddress
    }

    setSelecAddress({ ...tempObj, ...selecAddress })
  }

  return (
    <Modal
      isVisible={true}
      style={{
        margin: 0,
      }}
      backdropColor={Colors.wh}
      backdropOpacity={1}
    >
      <DefaultHeaderLeft onPress={(): void => setIsModal(false)} />
      <Postcode
        style={{
          width: Layout.window.width,
          height: Dimensions.get('window').height - 150,
        }}
        onSelected={(data): void => {
          handleAddress(data)
          setIsModal(false)
        }}
        onError={(): void => {
          alert({ desc: '주소 검색 중 오류가 발생하였습니다.' })
          setIsModal(false)
        }}
      />
    </Modal>
  )
}
