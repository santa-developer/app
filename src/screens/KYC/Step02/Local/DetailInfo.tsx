import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { Colors } from '@constants'
import Text from '@components/Text'
import KYCHeader from '@screens/KYC/components/KYCProgress'
import RadioButton from '@components/RadioButton'
import { SelectBox } from '@components/SelectBox'
import ChangeAddress from './PostCode'
import { postCodeState } from '@recoil/atoms/postcode'
import Body from '@components/Body'
import NavigationService from '@service/NavigationService'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import Hr from '@components/Hr'
import { KYC02UserInfo, initKYCInfo } from '@recoil/atoms/KYC/kyc'
import { code, kyc } from '@api/kyc.api'
import HeaderLeft from '@screens/KYC/components/KYCHeaderLeft'
import { CODE, SELECT_ITEM } from '@models/KYC'
import { VALIDATIONS } from '@utils/ValidationCheck'
import TextInput from '@components/TextInput'
import { useAlert } from '@hooks/useCommonAlert'
import { BottomButtonOne } from '@components/BottomButton'

export default function DetailInfo(): JSX.Element {
  const controller = new AbortController()
  const signal = controller.signal

  // Kyc init 정보
  const [kycInfo, setKycInfo] = useRecoilState(initKYCInfo)
  // kyc 02 detail 정보
  const [kycUserInfo, setKycUserInfo] = useRecoilState(KYC02UserInfo)
  const {
    engFirstName,
    engLastName,
    workCode, //직업
    trnsPrpsCode, //거래목적
    srcsIncmCode, // 소득출처
    realOwnUser,
  } = kycUserInfo
  const alert = useAlert()

  // 주소 모달 State
  const [isPostCode, setIsPostCode] = useState(false)
  const [selecAddress, setSelecAddress] =
    useRecoilState(postCodeState)

  // 직업
  const [workList, setWorkList] = useState<SELECT_ITEM[]>([])
  const [selectWork, setSelectWork] = useState<SELECT_ITEM>()

  // 거래 목적
  const [trnsPrpsList, setTrnsPrpsList] = useState<SELECT_ITEM[]>([])
  const [selectPrps, setSelectPrps] = useState<SELECT_ITEM>()

  // 소득 출처
  const [srcsIncmList, setSrcsIncmList] = useState<SELECT_ITEM[]>([])
  const [selectIncm, setSelectIncm] = useState<SELECT_ITEM>()

  // 코드 정의
  const initCodeList = async (): Promise<void> => {
    const params = {
      grupCode: ['WORK_CODE', 'TRNS_PRPS_CODE', 'SRCS_INCM_CODE'],
    }

    const result = await code.listProc.get(params, signal)

    if (result.check) {
      const { list } = result.response

      setWorkList(() => {
        const arr = list.filter((item: CODE) => {
          return item.grupCode === 'WORK_CODE'
        })

        return arr.map((item) => {
          const { code, codeName } = item
          return { label: codeName, value: code }
        })
      })
      setTrnsPrpsList(() => {
        const arr = list.filter((item: CODE) => {
          return item.grupCode === 'TRNS_PRPS_CODE'
        })

        return arr.map((item) => {
          const { code, codeName } = item
          return { label: codeName, value: code }
        })
      })
      setSrcsIncmList(() => {
        const arr = list.filter((item: CODE) => {
          return item.grupCode === 'SRCS_INCM_CODE'
        })

        return arr.map((item) => {
          const { code, codeName } = item
          return { label: codeName, value: code }
        })
      })
    }
  }

  // 사용자 정보 초기화
  const resetUserInfo = useResetRecoilState(KYC02UserInfo)

  // 주소 초기화
  const initState = (): void => {
    const initPostCode = {
      reciAddress1: '',
      reciAddress2: '',
      reciAddress3: '',
    }

    setSelecAddress(initPostCode)
  }

  // 초기값 설정
  const handleInit = async (): Promise<void> => {
    initState()
    await initCodeList()
    await resetUserInfo()
  }

  // 입력 여부 확인
  const handleBtnActive = (): boolean => {
    let isBtnActive = false

    if (
      selecAddress.reciAddress1 &&
      selecAddress.reciAddress2 &&
      selecAddress.reciAddress3 &&
      engFirstName &&
      engLastName &&
      workCode &&
      trnsPrpsCode &&
      srcsIncmCode &&
      realOwnUser === 'Y'
    ) {
      isBtnActive = true
    }

    return isBtnActive
  }

  // KCY 인증하기
  const nextPage = async (): Promise<void> => {
    if (
      !(
        VALIDATIONS.checkEngText.test(engLastName) &&
        VALIDATIONS.checkEngText.test(engFirstName)
      )
    ) {
      alert({ desc: `영문이름을 작성해주세요.` })
      return
    }

    const params = { ...kycUserInfo, ...selecAddress }

    const result = await kyc.kycIdnttVrfct.post({
      params,
      signal,
    })

    if (result.check) {
      setKycInfo({ ...kycInfo, kycLevel: 2 })
      NavigationService.push('KYC03Step')
    } else {
      alert({ desc: result.message })
    }
  }

  useEffect(() => {
    if (kycInfo.kycLevel && kycInfo.kycLevel < 5) handleInit()
  }, [])

  return (
    <>
      <KYCHeader title={`정보입력하기`} step={1} />
      <Hr borderWidth={14} borderColor={Colors.bg1} />
      <Body
        hidePadding
        scrollable
        bottomComponent={
          <BottomButtonOne
            text={'다음'}
            buttonType={handleBtnActive() ? 'active' : 'enabled'}
            onPress={nextPage}
          />
        }
      >
        <View style={styles.contentsContainer}>
          <View style={styles.textLine}>
            <Text
              size={16}
              bold={'500'}
              color={Colors.bl}
            >{`${kycInfo.userFstnm}${kycInfo.userLstnm}님`}</Text>
            <Text
              size={16}
              bold={'400'}
              color={Colors.nagative}
            >{`의 정보를 입력해주세요.`}</Text>
          </View>
          {/* 영문 이름 */}
          <View>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
            >{`영문 이름`}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={'성 입력'}
                value={engLastName}
                containerStyle={styles.lastNameBox}
                onChangeText={(text): void =>
                  setKycUserInfo({
                    ...kycUserInfo,
                    engLastName: text,
                  })
                }
              />
              <TextInput
                placeholder={'이름 입력'}
                value={engFirstName}
                containerStyle={styles.firstNameBox}
                onChangeText={(text): void =>
                  setKycUserInfo({
                    ...kycUserInfo,
                    engFirstName: text,
                  })
                }
              />
            </View>
          </View>
          {/* 자택주소 */}
          <View>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
            >{`자택주소`}</Text>

            <View
              style={[
                styles.inputContainer,
                {
                  marginBottom: selecAddress.reciAddress2 ? 10 : 28,
                },
              ]}
            >
              <TextInput
                placeholder={'주소를 검색해주세요.'}
                editable={false}
                maxLength={50}
                value={selecAddress.reciAddress2}
                containerStyle={styles.addressBox}
              />

              <TouchableOpacity
                style={styles.addressBtn}
                onPress={(): void => setIsPostCode(true)}
              >
                <Text size={14} bold={'500'} color={Colors.wh}>
                  주소검색
                </Text>
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder={'상세주소 입력'}
              editable={true}
              maxLength={15}
              value={selecAddress.reciAddress3}
              onChange={(evt): void =>
                setSelecAddress({
                  ...selecAddress,
                  reciAddress3: evt.nativeEvent.text,
                })
              }
              containerStyle={
                (styles.addressDetailBox,
                {
                  display: selecAddress.reciAddress2
                    ? 'flex'
                    : 'none',
                  marginBottom: selecAddress.reciAddress2
                    ? 28
                    : undefined,
                })
              }
            />
          </View>

          {/* 우편번호 검색 */}
          {isPostCode && <ChangeAddress setIsModal={setIsPostCode} />}

          {/* 직업 */}
          <View style={styles.selectContainer}>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ marginBottom: 8 }}
            >{`직업`}</Text>
            <SelectBox
              placeholder={'직업 선택'}
              items={workList}
              selectedValue={selectWork}
              onValueChange={(item): void => {
                setSelectWork(item)
                setKycUserInfo({
                  ...kycUserInfo,
                  workCode: item.value,
                })
              }}
            />
          </View>

          {/* 거래 목적 */}
          <View style={styles.selectContainer}>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ marginBottom: 8 }}
            >{`거래 목적`}</Text>
            <SelectBox
              placeholder={'선택'}
              items={trnsPrpsList}
              selectedValue={selectPrps}
              onValueChange={(item): void => {
                setSelectPrps(item)
                setKycUserInfo({
                  ...kycUserInfo,
                  trnsPrpsCode: item.value,
                })
              }}
            />

            {/* 거래목적 기타 선택 시 인풋  */}
            {trnsPrpsCode === '99' && (
              <TextInput
                placeholder={`거래목적 내용 입력`}
                containerStyle={{ marginTop: 10 }}
                onChangeText={(text): void =>
                  setKycUserInfo({
                    ...kycUserInfo,
                    trnsPrpsContents: text,
                  })
                }
              />
            )}
          </View>

          {/* 소득 출처 */}
          <View style={styles.selectContainer}>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ marginBottom: 8 }}
            >{`소득 출처`}</Text>
            <SelectBox
              placeholder={'선택'}
              items={srcsIncmList}
              selectedValue={selectIncm}
              onValueChange={(item): void => {
                setSelectIncm(item)
                setKycUserInfo({
                  ...kycUserInfo,
                  srcsIncmCode: item.value,
                })
              }}
            />
            {srcsIncmCode === '99' && (
              <TextInput
                placeholder={`소득출처 내용 입력`}
                containerStyle={{ marginTop: 10 }}
                onChangeText={(text): void =>
                  setKycUserInfo({
                    ...kycUserInfo,
                    srcsIncmEtcNm: text,
                  })
                }
              />
            )}
          </View>

          <View>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ lineHeight: 20 }}
            >{`${'홍길동'}님은 하블에서 거래하고자 하는 계정 및 자금의 실제 소유자가 맞습니까?`}</Text>

            <View style={styles.radioContainer}>
              <View style={{ marginRight: 75 }}>
                <RadioButton
                  checked={realOwnUser === 'Y'}
                  desc={'예, 맞습니다.'}
                  onPress={(): void =>
                    setKycUserInfo({
                      ...kycUserInfo,
                      realOwnUser: 'Y',
                    })
                  }
                />
              </View>
              <RadioButton
                checked={realOwnUser === 'N'}
                desc={'아니오'}
                onPress={(): void =>
                  setKycUserInfo({
                    ...kycUserInfo,
                    realOwnUser: 'N',
                  })
                }
              />
            </View>
          </View>
        </View>
      </Body>
    </>
  )
}

DetailInfo.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    headerLeft: (): JSX.Element => <HeaderLeft />,
    title: '',
    gestureEnabled: false,
  })
}

const styles = StyleSheet.create({
  contentsContainer: {
    paddingHorizontal: 15,
  },
  textLine: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    marginTop: 26,
    marginBottom: 44,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 28,
  },
  firstNameBox: {
    flex: 2,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.disabled,
    borderRadius: 4,
  },
  lastNameBox: {
    flex: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.disabled,
    borderRadius: 4,
    marginRight: 5,
  },
  addressBox: {
    flex: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.disabled,
    marginRight: 5,
    height: 48,
  },
  addressDetailBox: {
    flex: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.disabled,
    marginRight: 5,
  },
  addressBtn: {
    width: 80,
    height: 48,
    backgroundColor: Colors.active,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  selectContainer: {
    marginBottom: 28,
  },
})
