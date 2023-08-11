export interface GetRequestWalletTransactionList {
  searchText?: string
  spaceId?: string
  type: 'withdraw' | 'deposit' | ''
  sort: 'asc' | 'desc'
  transactionType: 'normal' | 'deposit' | 'staking' | 'savebox' | ''
  month: string
  currPage: number
  recordCountPerPage: number
}

export interface ResponseWalletTransactionList {
  pagination: Pagination
  list: TransactionVO[]
}

export interface GetRequestWalletRecentList {
  currPage: number
  recordCountPerPage: number
  searchText: string
}

export interface GetResponseWalletRecentList {
  code: number
  message: string
  check: boolean
  response: {
    pagenation: Pagination
    list: RecentReceiverVO[]
  }
}

export interface GetRequestWalletFollowingList {
  mebrMgmtNmbr?: string
  currPage?: number
  recordCountPerPage?: number
  searchText?: string
  listType?: string
}

export interface GetResponseWalletFollowingList {
  pagination: Pagination
  list: MebrVO[]
}

/**
 * 송금 팔로잉 리스트
 */
export interface MebrVO {
  mebrMgmtNmbr: string //회원관리번호
  userId: string //아이디
  address: string //지갑주소
  webUrl: string //이미지 소스 URL
}

export interface RecentReceiverVO {
  id: string
  receiverAddress: string
  userId: string
  favoriteYn: string
  mebrMgmtNmbr: string
  address: string
  memberId: string
  searchText: string
  startIndex: number
  cntPerPage: number
  currPage: number
  recordCountPerPage: number
}

export interface Pagination {
  RECORD_COUND: number
  PAGE_SIZE: number
  currentPageNo: number
  recordCountPerPage: number
  pageSize: number
  totalRecordCount: number
}

/**
 * 특정 날짜의 단일 내역
 */
export interface TransactionVO {
  id: string
  amount: string //금액
  createdAt: string // 입/출금일
  fromAddress: string //출금된 지갑주소
  questId: string
  toAddress: string //입금된 지갑주소
  transactionId: string
  transactionType:
    | 'normal'
    | 'staked'
    | 'activity'
    | 'hunter'
    | 'challenge'
  transferType: 'WITHDRAW' | 'DEPOSIT'
  spaceId: string
  status: string
  userId: string
  hispName: string
  searchText: string
  sort: string
  month: string
  type: string
  address: string
  originAmount: string
  txHash: string
  totalAmount: string
  startIndex: number
  cntPerPage: number
  currPage: number
  recordCountPerPage: number
  rewardDesce: string
}

export interface MyHIBS {
  address: string
  token: {
    amount: number
    tokenPrice: number
  }
}

export interface MyStaking {
  address: string
  amount: number
  memberId: string
  tokenPrice: number
}
