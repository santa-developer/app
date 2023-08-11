import { IRecordList } from '@screens/Wallet/components/WalletRecordList'
import { atom } from 'recoil'

export const walletTransferButtonChange = atom({
  key: 'walletTransferButtonChange',
  default: false,
})

export const walletAddressInputValue = atom({
  key: 'walletAddressInputValue',
  default: '',
})

export const walletSendingHIBS = atom({
  key: 'walleSendingHIBS',
  default: '',
})

/**
 * api로 가져온 원본 데이터
 */
export const walletTransactionRecordList = atom<IRecordList[]>({
  key: 'walletTransactionRecordList',
  default: [],
})

/**
 * 필터 설정에 따른 화면 보여주기 데이터
 */
export const walletTransactionWithFilter = atom<IRecordList[]>({
  key: 'walletTransactionWithFilter',
  default: [],
})
