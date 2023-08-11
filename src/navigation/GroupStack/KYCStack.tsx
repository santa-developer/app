import KYCMain from '@screens/KYC/KYCMain'
import KYC02Step from '@screens/KYC/Step02'
import KYCDetailInfo from '@screens/KYC/Step02/Local/DetailInfo'
import KYC03Step from '@screens/KYC/Step03'
import KYC04Step from '@screens/KYC/Step04'
import ForeignerKYCDone from '@screens/KYC/Step04/Foreigner/ForeignerKYCDone'
import LocalKYCDone from '@screens/KYC/Step04/Local/LcoalKYCDone'
// import Checking from '@screens/KYC/Step03/Local/Checking'
import KYCIdentityDone from '@screens/KYC/Step03/Local/IdentityDone'
import KYCCheckAccount from '@screens/KYC/Step04/Local/CheckAccount'
import KYCPass from '@screens/KYC/Step02/Local/KYCPass'
import ForeignerInfo from '@screens/KYC/Step02/Foreiner/ForeignerInfo'

const kycGroup = {
  KYCMain,
  KYC02Step,
  KYCPass,
  ForeignerInfo,
  KYCDetailInfo,
  KYC03Step,
  KYC04Step,
  ForeignerKYCDone,
  LocalKYCDone,
  KYCIdentityDone,
  KYCCheckAccount,
}

export default kycGroup
