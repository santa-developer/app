import { FlatList, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from '@components/Text'
import { Colors } from '@constants'
import NavigationService from '@service/NavigationService'
import moment from 'moment'

export interface IRecord {
  id: string
  title: string
  category: string
  createdAt: string //거래일시
  transferType: 'DEPOSIT' | 'WITHDRAW' //구분 DEPOSIT: 입금, WITHDRAW: 출금
  address: string //지갑주소
  transactionType:
    | 'normal'
    | 'staked'
    | 'activity'
    | 'hunter'
    | 'challenge' //거래유형
  money: number
  total: number
  userId: string
}

export interface IRecordList {
  list: IRecord[]
  date: string
}

interface IProps {
  records: IRecordList[]
}

/**
 * 거래내역 리스트
 */
export default function WalletRecordList({
  records = [],
}: IProps): JSX.Element {
  return (
    <FlatList
      data={records}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }): JSX.Element => {
        const date = moment(item.date)

        return (
          <DailyTokenRecord
            date={`${date.format('YYYY.MM.DD')}`}
            records={item.list}
            key={index}
          />
        )
      }}
    />
  )
}

interface IDailyTokenRecord {
  date: string
  records: IRecord[]
}

/**
 * 날짜 포함된 그날 하루에 거래된 내역
 */
const DailyTokenRecord = ({
  date,
  records = [],
}: IDailyTokenRecord): JSX.Element => (
  <View>
    {records.length !== 0 && (
      <Text
        color={Colors.disabled}
        size={12}
        bold="400"
        style={{ paddingBottom: 10 }}
      >
        {date}
      </Text>
    )}
    <TokenRecord records={records} />
  </View>
)

interface ITokenRecord {
  records: IRecord[]
}
/**
 * 단일 거래내역을 표시하는 컴포넌트
 */
const TokenRecord = ({ records = [] }: ITokenRecord): JSX.Element => (
  <View>
    {records.map((item, index) => (
      <TouchableOpacity
        onPress={(): void =>
          NavigationService.navigate('WalletTokenDetailRecord', {
            item,
          })
        }
        key={index}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 10,
          }}
        >
          <View>
            <Text size={16} bold="400">
              {item.title}
            </Text>
            <Text size={12} bold="400" color={Colors.nagative}>
              {item.category}
            </Text>
          </View>
          <View>
            <Text
              color={
                item.transferType === 'DEPOSIT'
                  ? Colors.point
                  : Colors.error
              }
              size={16}
              bold="700"
            >
              {item.transferType === 'DEPOSIT'
                ? `+${item.money.toLocaleString()} HIBS`
                : `-${item.money.toLocaleString()} HIBS`}
            </Text>

            <Text
              size={12}
              color={Colors.nagative}
              style={{ alignSelf: 'flex-end' }}
            >
              {`${item.total.toLocaleString()} HIBS`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ))}
  </View>
)
