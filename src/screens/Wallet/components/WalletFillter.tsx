import React, { useEffect, useState } from 'react'
import {
  Pressable,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native'
import Text from '@components/Text'
import Icon from 'react-native-fontawesome-pro'
import { Colors } from '@constants'
import WalletButton from './WalletButton'
import { Tooltip } from '@rneui/themed'
import WalletSearchHeader from './WalletSearchHeader'
import BottomModal from '@components/BottomModal'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  walletTransactionRecordList,
  walletTransactionWithFilter,
} from '@recoil/atoms/Wallet/wallet'
import moment from 'moment'
import { cloneDeep } from 'lodash'

type TransferType = 'DEPOSIT' | 'WITHDRAW' | 'ALL'
type Period = '1' | '3' | '6' | 'ALL'
type TransactionType = 'normal' | 'reward' | 'staking' | 'all'
type sorted = 'latest' | 'past'
/**
 * 거래내역을 원하는 조건으로 검색하게 하는 검색필터 element.
 * 필터 모달을 이곳에서 제공
 */
export default function WalletFillter(): JSX.Element {
  const [visible, setVisible] = useState(false)
  const [visiblTooptip, setVisibleTooltip] = useState(false)

  return (
    <View
      style={{
        borderBottomWidth: 2,
        borderBottomColor: Colors.gr,
      }}
    >
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <FilterModal
          visible={visible}
          onClose={(): void => setVisible(false)}
        />
        {/* 거래내역 */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text size={16} bold="500" style={{ marginRight: 5 }}>
            거래내역
          </Text>

          <Tooltip
            visible={visiblTooptip}
            height={180}
            width={280}
            backgroundColor={Colors.modalBg}
            onClose={(): void => setVisibleTooltip(false)}
            popover={
              <View style={{ flex: 1, gap: 10 }}>
                <Text bold="500" size={14}>
                  거래내역
                </Text>
                <Text>
                  - 하블 앱 플랫폼 내에서 발생하는 거래내역만 조회
                  가능합니다. 그 외 거래내역은 블록체인 트랜젝션 로그
                  페이지에서 확인 할 수 있습니다.
                </Text>
                <TouchableOpacity>
                  <Text color={Colors.error}>
                    {`블록체인 트랜젝션 로그 확인하기 >`}
                  </Text>
                </TouchableOpacity>
              </View>
            }
          >
            <Icon
              name="circle-exclamation"
              onPress={(): void => setVisibleTooltip(true)}
            />
          </Tooltip>
        </View>

        {/* 필터 버튼 */}
        <Pressable
          onPress={(): void => setVisible(true)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
            }}
          >
            <Text size={14}>3개월 • 전체 • 전체 • 최신순 </Text>
            <Icon name="chevron-down" size={15} />
          </View>
        </Pressable>
      </View>
      <WalletSearchHeader />
    </View>
  )
}

interface IFilterModal {
  visible: boolean
  onClose: () => void
}
/**
 * 거래내역 검색 필터
 */
const FilterModal = ({
  visible,
  onClose,
}: IFilterModal): React.JSX.Element => {
  const [modalVisible, setModalVisible] = useState(visible)
  /**
   * 처음 api로 가져온 원본 데이터
   */
  const originalData = useRecoilValue(walletTransactionRecordList)
  /**
   * 필터링을 통해 데이터 변경
   */
  const setRecordListWithFilter = useSetRecoilState(
    walletTransactionWithFilter
  )

  const [clickedTerm, setClickedTerm] = useState<Period>('1') //현재 클릭한 기간 필터버튼
  const [clickedType, setType] = useState<TransferType>('ALL') //현재 클릭한 구분 필터버튼
  const [clickedTransactionClass, setTransactionClass] =
    useState<TransactionType>('all') //현재 클릭한 거래유형 필터버튼
  const [clickedSort, setSort] = useState<sorted>('latest') //현재 클릭한 정렬기준 필터버튼

  useEffect(() => setModalVisible(visible), [visible])

  /**
   * 필터 설정
   */
  const filteredRecordList = (): void => {
    const now = moment()
    let filtered = cloneDeep(originalData)

    // 기간 필터링
    if (clickedTerm !== 'ALL')
      filtered = filtered.filter((item) => {
        const itemDate = moment(item.date)

        if (clickedTerm === '1') {
          if (now.diff(itemDate, 'month') <= 1) return item
        }
        if (clickedTerm === '3') {
          if (now.diff(itemDate, 'month') <= 3) return item
        }
        if (clickedTerm === '6') {
          if (now.diff(itemDate, 'month') <= 6) return item
        }
      })

    // 구분 필터링
    if (clickedType !== 'ALL')
      filtered = filtered.map((item) => {
        if (clickedType === 'DEPOSIT')
          item.list = item.list.filter(
            (el) => el.transferType === 'DEPOSIT'
          )
        if (clickedType === 'WITHDRAW')
          item.list = item.list.filter(
            (el) => el.transferType === 'WITHDRAW'
          )

        return item
      })

    //거래유형 필터링
    if (clickedTransactionClass !== 'all') {
      filtered = filtered.map((item) => {
        if (clickedTransactionClass === 'normal')
          item.list = item.list.filter(
            (el) => el.transactionType === 'normal'
          )
        if (clickedTransactionClass === 'reward')
          item.list = item.list.filter(
            (el) => el.transactionType !== 'normal'
          )
        if (clickedTransactionClass === 'staking')
          item.list = item.list.filter(
            (el) => el.transactionType === 'staked'
          )

        return item
      })
    }

    if (clickedSort === 'latest')
      filtered.sort(
        (a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()
      )
    if (clickedSort === 'past')
      filtered.sort(
        (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()
      )

    setRecordListWithFilter(filtered)
  }

  return (
    <BottomModal
      isVisible={modalVisible}
      onBackdropPress={onClose}
      modalHeight={'60%'}
    >
      <View style={style.ModalContainer}>
        <View style={style.ModalHeader}>
          <Text size={18} bold="700">
            필터
          </Text>

          {/* 초기화 버튼 */}
          <Pressable
            style={style.ModalHeaderIconContainer}
            onPress={(): void => {
              setClickedTerm('1')
              setType('ALL')
              setTransactionClass('all')
              setSort('latest')
            }}
          >
            <Icon
              name="arrow-rotate-left"
              color={Colors.nagative}
              size={18}
            />
            <Text>초기화</Text>
          </Pressable>
        </View>

        {/* 각 항목 필터버튼 */}
        <View style={style.ModalElementContainer}>
          <View style={style.ModalButtonContainer}>
            {/* 필터 - 기간 */}
            <View style={style.ButtonRow}>
              <Text>기간</Text>
              {/* 1개월 */}
              <Pressable
                style={
                  buttonClickStyle({
                    click: clickedTerm,
                    button: '1',
                  }).filterButton
                }
                onPress={(): void => setClickedTerm('1')}
              >
                <Text
                  style={
                    buttonClickStyle({
                      click: clickedTerm,
                      button: '1',
                    }).buttonText
                  }
                >
                  1개월
                </Text>
              </Pressable>
              {/* 3개월 */}
              <Pressable
                style={
                  buttonClickStyle({
                    click: clickedTerm,
                    button: '3',
                  }).filterButton
                }
                onPress={(): void => setClickedTerm('3')}
              >
                <Text
                  style={
                    buttonClickStyle({
                      click: clickedTerm,
                      button: '3',
                    }).buttonText
                  }
                >
                  3개월
                </Text>
              </Pressable>
              {/* 6개월 */}
              <Pressable
                style={
                  buttonClickStyle({
                    click: clickedTerm,
                    button: '6',
                  }).filterButton
                }
                onPress={(): void => setClickedTerm('6')}
              >
                <Text
                  style={
                    buttonClickStyle({
                      click: clickedTerm,
                      button: '6',
                    }).buttonText
                  }
                >
                  6개월
                </Text>
              </Pressable>
              {/* 전체 */}
              <Pressable
                style={
                  buttonClickStyle({
                    click: clickedTerm,
                    button: 'ALL',
                  }).filterButton
                }
                onPress={(): void => setClickedTerm('ALL')}
              >
                <Text
                  style={
                    buttonClickStyle({
                      click: clickedTerm,
                      button: 'ALL',
                    }).buttonText
                  }
                >
                  전체
                </Text>
              </Pressable>
            </View>

            {/* 필터 - 구분 */}
            <View style={style.ButtonRow}>
              <Text>구분</Text>
              {/* 전체 */}
              <Pressable
                style={
                  buttonClickStyle({
                    click: clickedType,
                    button: 'ALL',
                  }).filterButton
                }
                onPress={(): void => setType('ALL')}
              >
                <Text
                  style={
                    buttonClickStyle({
                      click: clickedType,
                      button: 'all',
                    }).buttonText
                  }
                >
                  전체
                </Text>
              </Pressable>
              {/* 입금 */}
              <Pressable
                style={
                  buttonClickStyle({
                    click: clickedType,
                    button: 'DEPOSIT',
                  }).filterButton
                }
                onPress={(): void => setType('DEPOSIT')}
              >
                <Text
                  style={
                    buttonClickStyle({
                      click: clickedType,
                      button: 'deposit',
                    }).buttonText
                  }
                >
                  입금
                </Text>
              </Pressable>
              {/* 출금 */}
              <Pressable
                style={
                  buttonClickStyle({
                    click: clickedType,
                    button: 'WITHDRAW',
                  }).filterButton
                }
                onPress={(): void => setType('WITHDRAW')}
              >
                <Text
                  style={
                    buttonClickStyle({
                      click: clickedType,
                      button: 'withdraw',
                    }).buttonText
                  }
                >
                  출금
                </Text>
              </Pressable>
            </View>

            {/* 필터 - 거래유형 */}
            <View style={style.ButtonRow}>
              <Text>거래유형</Text>
              {/* 전체 */}
              <Pressable
                style={
                  buttonClickStyle({
                    click: clickedTransactionClass,
                    button: 'all',
                  }).filterButton
                }
                onPress={(): void => setTransactionClass('all')}
              >
                <Text
                  style={
                    buttonClickStyle({
                      click: clickedTransactionClass,
                      button: 'all',
                    }).buttonText
                  }
                >
                  전체
                </Text>
              </Pressable>

              {/* 일반거래 */}
              <Pressable
                style={
                  buttonClickStyle({
                    click: clickedTransactionClass,
                    button: 'normal',
                  }).filterButton
                }
                onPress={(): void => setTransactionClass('normal')}
              >
                <Text
                  style={
                    buttonClickStyle({
                      click: clickedTransactionClass,
                      button: 'normal',
                    }).buttonText
                  }
                >
                  일반거래
                </Text>
              </Pressable>

              {/* 보상 */}
              <Pressable
                style={
                  buttonClickStyle({
                    click: clickedTransactionClass,
                    button: 'reward',
                  }).filterButton
                }
                onPress={(): void => setTransactionClass('reward')}
              >
                <Text
                  style={
                    buttonClickStyle({
                      click: clickedTransactionClass,
                      button: 'reward',
                    }).buttonText
                  }
                >
                  보상
                </Text>
              </Pressable>

              {/* 스테이킹 */}
              <Pressable
                style={
                  buttonClickStyle({
                    click: clickedTransactionClass,
                    button: 'staking',
                  }).filterButton
                }
                onPress={(): void => setTransactionClass('staking')}
              >
                <Text
                  style={
                    buttonClickStyle({
                      click: clickedTransactionClass,
                      button: 'staking',
                    }).buttonText
                  }
                >
                  스테이킹
                </Text>
              </Pressable>
            </View>

            {/* 필터 - 정렬기준 */}
            <View style={style.ButtonRow}>
              <Text>정렬기준</Text>

              {/* 최신순 */}
              <Pressable
                style={
                  buttonClickStyle({
                    click: clickedSort,
                    button: 'latest',
                  }).filterButton
                }
                onPress={(): void => setSort('latest')}
              >
                <Text
                  style={
                    buttonClickStyle({
                      click: clickedSort,
                      button: 'latest',
                    }).buttonText
                  }
                >
                  최신순
                </Text>
              </Pressable>

              {/* 최신순 */}
              <Pressable
                style={
                  buttonClickStyle({
                    click: clickedSort,
                    button: 'past',
                  }).filterButton
                }
                onPress={(): void => setSort('past')}
              >
                <Text
                  style={
                    buttonClickStyle({
                      click: clickedSort,
                      button: 'past',
                    }).buttonText
                  }
                >
                  과거순
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <WalletButton
          text="적용하기"
          onPress={(): void => {
            filteredRecordList()
            onClose()
          }}
        />
      </View>
    </BottomModal>
  )
}

interface Style {
  filterButton: {
    borderRadius: number
    borderWidth: number
    paddingHorizontal: number
    paddingVertical: number
    borderColor: string
  }
  buttonText: {
    color: string
  }
}

interface IProps {
  click: string
  button: string
}

const buttonClickStyle = ({ click, button }: IProps): Style => {
  const style = StyleSheet.create({
    filterButton: {
      borderRadius: 12,
      borderWidth: 1,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderColor: click === button ? Colors.active : Colors.nagative,
    },
    buttonText: {
      color: click === button ? Colors.active : Colors.nagative,
    },
  })

  return style
}

const style = StyleSheet.create({
  ButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  ModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  ModalHeaderIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ModalElementContainer: {
    height: '100%',
    flex: 4,
  },
  ModalButtonContainer: {
    height: '100%',
    justifyContent: 'space-evenly',
  },
  ModalContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.wh,
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
})
