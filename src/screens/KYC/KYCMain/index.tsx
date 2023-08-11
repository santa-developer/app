import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import NavigationService from '@service/NavigationService'
import Text from '@components/Text'
import { Colors } from '@constants'
import CheckBox from '@components/CheckBox'
import Body from '@components/Body'
import DenyModal from './DenyModal'
import KYCPersonComp from './Terms/PersonTerm'
import KYCUniqueInfoComp from './Terms/UniqueTerm'
import KYCServiceComp from './Terms/ServiceTerm'
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import IconChevron from '@components/Images/Icon/IconChevron'
import { useAlert } from '@hooks/useCommonAlert'
import { KYCReload, KYCterms } from '@recoil/atoms/KYC/kyc'
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import { ParamListBase } from '@react-navigation/native'
import { kyc } from '@api/kyc.api'
import { initKYCInfo } from '@recoil/atoms/KYC/kyc'
import { KYC_LIMIT } from '@models/KYC'
import { isLoadingShowState } from '@recoil/atoms/common'
import { setComma } from '@utils/NumberUtils'
import _ from 'lodash'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import $t from 'i18n'
import KYCPopUp from '../components/KYCPopUp'
import { BottomButtonOne } from '@components/BottomButton'

export default function KYCMain({
  navigation,
}: StackScreenProps<ParamListBase>): JSX.Element {
  const setisLoadingShow = useSetRecoilState(isLoadingShowState)
  const setKYCReload = useSetRecoilState(KYCReload)

  const [initkycInfo, setInitKycInfo] = useRecoilState(initKYCInfo)
  const [kycLimit, setKycLimit] = useState<{
    tableHead: string[]
    tableData: string[][]
  }>({
    tableHead: [],
    tableData: [],
  })

  const controller = new AbortController()
  const alert = useAlert()

  const resetTermsState = useResetRecoilState(KYCterms)

  const [isTerms, setIsTerms] = useRecoilState(KYCterms)
  const { allTerms, isPerson, isUnique, isService } = isTerms

  // 약관동의 모달 state
  const [isPersonModal, setIsPersonModal] = useState(false)
  const [isUniqueModal, setIsUniqueModal] = useState(false)
  const [isServiceModal, setIsServiceModal] = useState(false)

  // kyc 반려모달 state
  const [denyModal, setDenyModal] = useState(false)

  const loginedUserInfo = useRecoilValue(loginedUserInfoState)

  const getInit = async (): Promise<void> => {
    try {
      setisLoadingShow(true)
      const result = await kyc.getKycHome.get({
        signal: controller.signal,
      })

      if (result.check && result.response) {
        const { kycInfo, kycLimit } = result.response

        setInitKycInfo({ ...initkycInfo, ...kycInfo })

        // KYC Limit 정보
        const limitInfo = kycLimit.map((item: KYC_LIMIT) => {
          if (
            item.kycLevel === 2 ||
            item.kycLevel === 3 ||
            item.kycLevel === 4
          )
            return

          const limitDeposit =
            item.wonLimitDeposit === -1 ? `한도없음` : ''
          const wonLimitPerCount =
            item.wonLimitPerCount === 0
              ? `출금불가`
              : setComma(item.wonLimitPerCount)
          const wonLimitPerDay =
            item.wonLimitPerDay === 0
              ? `출금불가`
              : setComma(item.wonLimitPerDay)
          return [
            item.kycLevel === 1 ? `인증 전` : `인증완료`,
            limitDeposit,
            wonLimitPerCount,
            wonLimitPerDay,
          ]
        })

        // 출금 제한 데이터 설정
        setKycLimit(
          // Level, Head: 입금(원), 최대출금(1회), 최대출금(1일)
          {
            tableHead: [
              '',
              `입금(원)`,
              `최대출금(1회)`,
              `최대출금(1일)`,
            ],
            tableData: limitInfo,
          }
        )
      } else {
        alert({ desc: result.message })
      }
    } catch (e) {
    } finally {
      setisLoadingShow(false)
      setKYCReload(false)
    }
  }

  const renderRow = (arr: string[]): JSX.Element[] => {
    return arr?.map((item, idx) => (
      <View
        style={[
          styles.cell,
          {
            flex: idx === 0 ? 1.5 : 2,
            borderLeftWidth: idx === 0 ? 0 : 1,
          },
        ]}
        key={idx}
      >
        <Text size={12} color={Colors.bl} bold={'normal'}>
          {item}
        </Text>
      </View>
    ))
  }

  useEffect(() => {
    getInit()

    navigation.addListener('focus', (): void => {
      resetTermsState()
    })
  }, [KYCReload])

  const handlePressTermsAgree = (): void => {
    setIsTerms({
      allTerms: !allTerms,
      isPerson: !isPerson,
      isUnique: !isUnique,
      isService: !isService,
    })
  }

  const handlePressPersonInfo = (): void => {
    setIsTerms({ ...isTerms, isPerson: !isPerson })
  }

  const handlePressUniqueInfoBtn = (): void => {
    setIsTerms({ ...isTerms, isUnique: !isUnique })
  }

  const handlePressServiceBtn = (): void => {
    setIsTerms({ ...isTerms, isService: !isService })
  }

  // kycLevel & kycRqstSttsCode에 따른 진행단계 안내
  const handleKycStep = (): string | undefined => {
    const level = initkycInfo.kycLevel
    const step = initkycInfo.kyctRqstSttsCode

    if (level) {
      if (level < 4) return `인증 전`
      else if (level >= 4) {
        if (step === '01') return `심사중`
        else if (step === '03') return `인증 전`
        else return `인증완료`
      }
    }
  }

  const handleButton = (): void => {
    if (isPerson && isUnique && isService) {
      nextPage()
    } else {
      alert({
        desc: `약관에 동의하셔야\n KYC 인증을 진행할 수 있습니다.`,
      })
    }
  }

  const nextPage = (): void => {
    if (
      _.isEmpty(initkycInfo.kycLevel) ||
      initkycInfo.kycLevel === 1
    ) {
      NavigationService.push('KYC02Step')
    } else if (initkycInfo.kycLevel === 2) {
      NavigationService.push('KYC03Step')
    } else if (initkycInfo.kycLevel === 3) {
      NavigationService.push('KYC04Step')
    } else if (
      initkycInfo.kycLevel === 4 &&
      initkycInfo.kyctRqstSttsCode === '03' //승인반려
    ) {
      NavigationService.push('KYC02Step')
    }
  }

  return (
    <>
      <KYCPopUp />
      <Body
        scrollable
        hidePadding
        bottomComponent={
          ((initkycInfo.kycLevel === 4 &&
            initkycInfo.kyctRqstSttsCode === '03') ||
            initkycInfo.kycLevel !== 4) && (
            <BottomButtonOne
              buttonType={'active'}
              text={$t('USER.USER_STC_103')} // 'KYC 인증하기
              onPress={handleButton}
            />
          )
        }
      >
        {/* KYC 인증 반려모달 */}
        {denyModal && (
          <DenyModal
            isModal={denyModal}
            onPress={setDenyModal}
            reason={
              initkycInfo.kyctRqstSttsCode === '03' &&
              initkycInfo.kycLevel === 4
                ? initkycInfo.authDeniedReason
                : initkycInfo.residenceDeniedReason
            }
          />
        )}

        <View style={styles.kycGuideContainer}>
          <View>
            <View style={styles.titleContainer}>
              <View>
                <Text
                  size={16}
                  bold={'500'}
                  color={
                    initkycInfo.kycLevel === 4 &&
                    initkycInfo.kyctRqstSttsCode === '01'
                      ? Colors.active
                      : Colors.bl
                  }
                  style={{ lineHeight: 24 }}
                >
                  {`${
                    loginedUserInfo.userId
                  }님은 ${handleKycStep()}입니다.`}
                </Text>

                {/* kyc 심사중 */}
                {initkycInfo.kyctRqstSttsCode === '01' && (
                  <Text
                    size={12}
                    bold={'normal'}
                    color={Colors.nagative}
                  >
                    {/* {`KYC 인증심사는 영업일 기준 2-3일 소요됩니다.`} */}
                    {`* ${$t('KYC.KYC_STC_121')}`}
                  </Text>
                )}
              </View>

              {initkycInfo.kyctRqstSttsCode === '03' && (
                <TouchableOpacity
                  style={styles.denyBtn}
                  onPress={(): void => {
                    setDenyModal(true)
                  }}
                >
                  <Text
                    size={12}
                    bold={'normal'}
                    color={Colors.wh}
                  >{`반려사유 확인`}</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.kycDescContainer}>
              <Text
                size={14}
                bold={'500'}
                color={Colors.bl}
                style={{ marginBottom: 11 }}
              >
                {`KYC인증`}
              </Text>
              <Text
                size={14}
                bold={'normal'}
                color={Colors.nagative}
                style={{ marginBottom: 10, lineHeight: 20 }}
              >
                {/* Know Your Customer의 약자로 본인의 얼굴과 신\n  분증 사진을 첨부하여 신원을 증명하는 방식입니다. */}
                {`- ${$t(`KYC.KYC_STC_1`)}`}
              </Text>
              <Text
                size={14}
                bold={'normal'}
                color={Colors.nagative}
                style={{ lineHeight: 20 }}
              >
                {/* {`- KYC 인증완료 시 지갑 및 보팅 등 활동을 할 수\n  있습니다.`} */}
                {`- KYC ${$t(`KYC.KYC_STC_104`)}`}
              </Text>
            </View>
          </View>

          {/* 인증단계별 HIBS 한도 안내 */}
          <View>
            <Text
              size={16}
              bold="500"
              color={Colors.bl}
              style={{ marginBottom: 20 }}
            >
              {/* {`인증완료 시 HIBS 한도 안내`} */}
              {$t('KYC.KYC_STC_7')}
            </Text>
            <View style={styles.tableContainer}>
              <View style={styles.tableHead}>
                {kycLimit &&
                  kycLimit.tableHead.map(
                    (data, idx): React.JSX.Element => {
                      return (
                        <View
                          style={[
                            styles.cell,
                            {
                              flex: idx === 0 ? 1.5 : 2,
                              borderLeftWidth: idx === 0 ? 0 : 1,
                            },
                          ]}
                          key={idx}
                        >
                          <Text
                            size={10}
                            color={Colors.nagative}
                            bold={'normal'}
                          >
                            {data}
                          </Text>
                        </View>
                      )
                    }
                  )}
              </View>

              {kycLimit &&
                kycLimit.tableData.map(
                  (data, idx): React.JSX.Element | undefined => {
                    {
                      if (data) {
                        if (
                          (initkycInfo.kycLevel &&
                            initkycInfo.kycLevel < 4) ||
                          (initkycInfo.kycLevel === 4 &&
                            initkycInfo.kyctRqstSttsCode !== '02')
                        ) {
                          return data[0] === '인증 전' ? (
                            <View
                              key={idx}
                              style={[
                                styles.row,
                                { backgroundColor: Colors.gr },
                              ]}
                            >
                              {renderRow(data)}
                            </View>
                          ) : (
                            <View
                              key={idx}
                              style={[
                                styles.row,
                                { backgroundColor: Colors.wh },
                              ]}
                            >
                              {renderRow(data)}
                            </View>
                          )
                        } else {
                          return data[0] === '인증완료' ? (
                            <View
                              style={[
                                styles.row,
                                { backgroundColor: Colors.gr },
                              ]}
                              key={idx}
                            >
                              {renderRow(data)}
                            </View>
                          ) : (
                            <View
                              style={[
                                styles.row,
                                { backgroundColor: Colors.wh },
                              ]}
                              key={idx}
                            >
                              {renderRow(data)}
                            </View>
                          )
                        }
                      }
                    }
                  }
                )}
            </View>
          </View>

          {/* KYC 약관동의 */}
          {initkycInfo.kycLevel && initkycInfo.kycLevel < 4 && (
            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={handlePressTermsAgree}>
                <View
                  style={[
                    styles.termsAgree,
                    {
                      paddingBottom: 12,
                      borderBottomWidth: 1,
                      borderColor: Colors.bg1,
                    },
                  ]}
                >
                  <CheckBox
                    checked={isPerson && isUnique && isService}
                    onPress={handlePressTermsAgree}
                  />
                  <Text
                    size={14}
                    bold={'normal'}
                    color={
                      isPerson && isUnique && isService
                        ? Colors.bl
                        : Colors.disabled
                    }
                    style={{ lineHeight: 20 }}
                  >
                    {/* {`전체동의`} */}
                    {$t('USER.USER_WORD_18')}
                  </Text>
                </View>
              </TouchableOpacity>

              <View>
                <View style={styles.termsAgree}>
                  <CheckBox
                    checked={isPerson}
                    onPress={handlePressPersonInfo}
                  />
                  <TouchableOpacity
                    style={styles.termsContainer}
                    onPress={(): void => setIsPersonModal(true)}
                  >
                    <Text
                      size={14}
                      bold={'normal'}
                      color={isPerson ? Colors.bl : Colors.disabled}
                      style={{ lineHeight: 20 }}
                    >
                      {/* {`[필수] 개인정보 수집 및 이용동의`} */}
                      {`[${$t('USER.USER_WORD_40')}] ${$t(
                        'COMM.COMM_WORD_132'
                      )}`}
                    </Text>
                    <IconChevron
                      rotate={`-90`}
                      svgColor={
                        isPerson ? Colors.bl : Colors.disabled
                      }
                    />
                  </TouchableOpacity>
                </View>
                {/* 개인정보 수집 이용동의 약관 */}
                {isPersonModal ? (
                  <KYCPersonComp setIsKYCPerson={setIsPersonModal} />
                ) : undefined}
                <View style={styles.termsAgree}>
                  <CheckBox
                    checked={isUnique}
                    onPress={handlePressUniqueInfoBtn}
                  />
                  <TouchableOpacity
                    style={styles.termsContainer}
                    onPress={(): void => setIsUniqueModal(true)}
                  >
                    <Text
                      size={14}
                      bold={'normal'}
                      color={isUnique ? Colors.bl : Colors.disabled}
                      style={{ lineHeight: 20 }}
                    >
                      {/* {`[필수] 고유식별정보 처리 동의`} */}
                      {`[${$t('USER.USER_WORD_40')}] ${$t(
                        'USER.USER_WORD_48' //고유식별정보 처리 동의
                      )}`}
                    </Text>
                    <IconChevron
                      rotate={`-90`}
                      svgColor={
                        isPerson ? Colors.bl : Colors.disabled
                      }
                    />
                  </TouchableOpacity>
                </View>
                {/* 고유식별정보 처리 동의 약관 */}
                {isUniqueModal ? (
                  <KYCUniqueInfoComp
                    setIsKYCUnique={setIsUniqueModal}
                  />
                ) : undefined}
                <View style={styles.termsAgree}>
                  <CheckBox
                    checked={isService}
                    onPress={handlePressServiceBtn}
                  />
                  <TouchableOpacity
                    style={styles.termsContainer}
                    onPress={(): void => setIsServiceModal(true)}
                  >
                    <Text
                      size={14}
                      bold={'normal'}
                      color={isService ? Colors.bl : Colors.disabled}
                      style={{ lineHeight: 20 }}
                    >
                      {/* {`[필수] 서비스 이용 유의사항`} */}
                      {`[${$t('USER.USER_WORD_40')}] ${$t(
                        'USER.USER_WORD_49'
                      )}`}
                    </Text>
                    <IconChevron
                      rotate={`-90`}
                      svgColor={
                        isPerson ? Colors.bl : Colors.disabled
                      }
                    />
                  </TouchableOpacity>
                </View>
                {/* 서비스 이용 유의사항 약관 */}
                {isServiceModal ? (
                  <KYCServiceComp
                    setIsKYCService={setIsServiceModal}
                  />
                ) : undefined}
              </View>
            </View>
          )}
        </View>
      </Body>
    </>
  )
}

KYCMain.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: 'KYC 인증',
  })
}

const styles = StyleSheet.create({
  kycGuideContainer: {
    padding: 15,
    height: '100%',
    marginTop: 17,
  },
  titleContainer: {
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  denyBtn: {
    width: 85,
    height: 30,
    backgroundColor: Colors.nagative,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kycDescContainer: {
    width: '100%',
    backgroundColor: Colors.gr,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.bg1,
    borderStyle: 'solid',
    marginBottom: 30,
  },
  tableContainer: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.bg1,
  },
  tableHead: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 29,
    backgroundColor: Colors.gr,
  },
  row: {
    flexDirection: 'row',
    height: 40,
    borderColor: Colors.bg1,
    borderTopWidth: 1,
  },
  cell: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.bl,
    borderColor: Colors.bg1,
  },
  checkboxContainer: {
    marginTop: 38,
    marginBottom: 37,
  },
  termsAgree: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'space-between',
    marginTop: 12,
  },
  termsContainer: {
    width: Dimensions.get('window').width - 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
