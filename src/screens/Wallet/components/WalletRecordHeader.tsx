import { View } from 'react-native'
import React from 'react'
import {
  HIBSMarker,
  HIBSexchange,
  OwnHIBSAmount,
} from './WalletOwnHIBS'

interface IProps {
  title: string
  amount: string
  won: string
  wonTohips: string
}

/**
 * 거래내역 Header
 */
export default function WalletRecordHeader(
  props: IProps
): JSX.Element {
  return (
    <View style={{ gap: 10, flex: 1 }}>
      <HIBSMarker>{props.title}</HIBSMarker>
      <View>
        <OwnHIBSAmount size={30}>{props.amount}</OwnHIBSAmount>
        <HIBSexchange won={props.won} wonTohips={props.wonTohips} />
      </View>
    </View>
  )
}
