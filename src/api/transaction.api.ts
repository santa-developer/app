import apiPath from './path'
import { axiosGet } from './manager'
import {
  GetRequestWalletFollowingList,
  GetRequestWalletRecentList,
  GetRequestWalletTransactionList,
  GetResponseWalletFollowingList,
  GetResponseWalletRecentList,
  ResponseWalletTransactionList,
} from '@models/Common/WALLET'
import RESPONSE from '@models/Common/RESPONSE'

const { transaction: transactionPath } = apiPath

const transaction = {
  getTransactionList: {
    get: (
      params: GetRequestWalletTransactionList
    ): Promise<RESPONSE<ResponseWalletTransactionList>> => {
      return axiosGet({
        path: transactionPath.getTransactionList,
        params,
      })
    },
  },
  getRecentList: {
    get: (
      params: GetRequestWalletRecentList
    ): Promise<RESPONSE<GetResponseWalletRecentList>> =>
      axiosGet({ path: transactionPath.recentList, params }),
  },
  getWalletFollowingList: {
    get: (
      params?: GetRequestWalletFollowingList
    ): Promise<RESPONSE<GetResponseWalletFollowingList>> =>
      axiosGet({ path: transactionPath.followingList, params }),
  },
}

export default transaction
