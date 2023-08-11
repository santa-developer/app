// import React, { useEffect, useState } from 'react'
// import { useRecoilState, useSetRecoilState } from 'recoil'
// import { initKycOcr } from '@recoil/atoms/KYC/kyc'
// import { ImageProps, PhotoProps } from '@models/Upload/PHOTO'
// import _ from 'lodash'
// import { isLoadingShowState } from '@recoil/atoms/common'
// import { useAlert } from '@hooks/useCommonAlert'
// import $t from 'i18n'
// import NavigationService from '@service/NavigationService'
// import Body from '@components/Body'
// import { kyc } from '@api/kyc.api'
// import { useIsFocused } from '@react-navigation/native'
// import IconRotateCw from '@components/Images/Icon/IconRotateCw'

// export default function KycSelectPhoto(): JSX.Element {
//   const [kycOcr, setKycOcr] = useRecoilState(initKycOcr)
//   const controller = new AbortController()
//   const alert = useAlert()

//   const [localSelected, setLocalSelected] = useState<ImageProps[]>([])
//   const setIsLoadingShow = useSetRecoilState(isLoadingShowState)

//   function _getSelectedImages(images: PhotoProps[]): void {
//     const bltbFiles = _.map(images, (image) => {
//       return {
//         uri: image.uri,
//         name:
//           image.filename || image.uri.split('/').pop() || 'no_name',
//         type: 'image/jpg',
//         width: image.width,
//         height: image.height,
//       }
//     })

//     kycOcr.ocrFile = bltbFiles
//     setLocalSelected(bltbFiles)
//   }

//   const _handleComplete = async (): Promise<void> => {
//     setIsLoadingShow(true)

//     const result = await Utils.photo.presetList(localSelected)
//     if (result.check) {
//       setKycOcr({ ...kycOcr, ocrFile: result.imageList })

//       const params = {
//         ocrType: kycOcr.ocrType,
//         ocrFile: kycOcr.ocrFile,
//       }
//       // OCR 확인
//       const ocrResult = await kyc.requestOcr.post({
//         params,
//         signal: controller.signal,
//       })
//       if (ocrResult.check && ocrResult.response) {
//         const res = ocrResult.response

//         if (
//           _.isEmpty(res.image_base64_mask) ||
//           _.isEmpty(res.userName)
//         ) {
//           alert({ desc: $t('KYC.KYC_STC_80') })
//           return
//         }

//         if (kycOcr.ocrType !== Number(res.idType)) {
//           alert({
//             desc: $t('KYC.KYC_STC_72'),
//             onPressConfirm: (): void => {
//               NavigationService.goBack()
//             },
//           })
//           return
//         }

//         setKycOcr({
//           ...kycOcr,
//           userName: res.userName,
//           issueDate: res.issueDate,
//           ocrMaskFile: res.image_base64_mask,
//           juminNo1: res.juminNo1,
//           juminNo2: res.juminNo2,
//           juminNo: res.juminNo1 + res.juminNo2,
//         })

//         const year =
//           res.juminNo2.substr(0, 1) === '1' ||
//           res.juminNo2.substr(0, 1) === '2'
//             ? `19${res.juminNo1.substr(0, 2)}`
//             : `20${res.juminNo1.substr(0, 2)}`

//         const month = res.juminNo1.substr(2, 2)
//         const day = res.juminNo1.substr(4, 2)

//         const birthDate = `${year}${month}${day}`

//         if (kycOcr.ocrType === 1) {
//           setKycOcr({ ...kycOcr, birthDate })
//         } else if (kycOcr.ocrType === 2) {
//           setKycOcr({ ...kycOcr, birthDate, driverNo: res.driverNo })
//         } else {
//           setKycOcr({
//             ...kycOcr,
//             birthDate,
//             passportNo: res.passportNo,
//             expiryDate: res.expiryDate,
//           })
//         }
//         NavigationService.navigate('KYCIdentityDone')
//         setIsLoadingShow(false)
//       } else {
//         const message = $t(ocrResult.messageLocaleCode)
//         if (
//           message.includes('missing') &&
//           message.includes('translation') &&
//           !_.isEmpty(ocrResult.messageLocaleCode)
//         ) {
//           alert({
//             desc: `${$t('KYC.KYC_STC_85')}\n[${
//               ocrResult.messageLocaleCode
//             }]`,
//           })
//         } else {
//           alert({
//             desc: ocrResult.messageLocaleCode
//               ? $t(ocrResult.messageLocaleCode)
//               : ocrResult.message,
//           })
//         }
//       }
//     }
//   }

//   const isFocused = useIsFocused()

//   useEffect(() => {
//     if (isFocused) {
//       setLocalSelected([])
//     }
//   }, [isFocused])

//   return (
//     <>
//       <Body
//         useHeader={false}
//         style={{ padding: 0 }}
//         bottomComponent={
//           <BottomButton
//             title={$t('COMM.COMM_WORD_NEXT')}
//             disabled={localSelected.length < 1}
//             onPress={_handleComplete}
//           />
//         }
//       >
//         <PhotoSelector
//           selectedImages={localSelected}
//           maximum={1}
//           assetType="Photos"
//           photoType={PHOTO_TYPE}
//           imageListOption={{
//             imagesPerRow: 3,
//             imageMargin: 1,
//           }}
//           callback={_getSelectedImages}
//           selectedMarker={(index): JSX.Element => (
//             <SelectedMarker number={index} />
//           )}
//           headerOption={{
//             headerLeftComponent: (
//               <TouchableOpacity
//                 onPress={(): void => {
//                   NavigationService.goBack()
//                 }}
//                 style={{
//                   padding: 16,
//                   justifyContent: 'center',
//                 }}
//               >
//                 {/* <Icon
//                   name="chevron-left"
//                   type="light"
//                   size={22}
//                   color={Colors.darkGrey1}
//                 /> */}
//                 <IconRotateCw color={'#111111'} />
//               </TouchableOpacity>
//             ),
//           }}
//         />
//       </Body>
//     </>
//   )
// }
