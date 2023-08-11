import kycGroup from '../GroupStack/KYCStack'
import { mypageGroup } from '../GroupStack/MypageStack'
import { searchGroup } from '../GroupStack/SearchStack'
import { spaceGroup } from '../GroupStack/SpaceStack'
import walletGroup from '../GroupStack/WalletStack'
import { etcGroup } from '../GroupStack/EtcStack'

const outOfTabGroup = {
  ...kycGroup,
  ...mypageGroup,
  ...walletGroup,
  ...searchGroup,
  ...spaceGroup,
  ...etcGroup,
}

export default outOfTabGroup
