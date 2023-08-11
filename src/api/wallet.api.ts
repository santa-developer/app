import apiPath from './path'
import { axiosGetWallet } from './manager/wallet'

const { wallet: walletPath } = apiPath

const wallet = {
  myAsset: {
    get: (): Promise<any> =>
      axiosGetWallet({ path: walletPath.asset }),
  },
  myStaking: {
    get: (): Promise<any> =>
      axiosGetWallet({ path: walletPath.staking }),
  },
}

export default wallet
