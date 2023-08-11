import { Asset } from 'react-native-image-picker'
import { ImageProps } from '@models/Upload/PHOTO'

export interface ShadowProps {
  children?: React.ReactNode
}

export interface KYC_MODAL_TYPE {
  isModal: boolean
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

export interface UPLOAD_IMG {
  uploadIDcardImg: Asset[] | ImageProps[] | undefined
  uploadFaceImg: Asset[] | ImageProps[] | undefined
  uploadPORImg: Asset[] | ImageProps[] | undefined
  uploadPORFaceImg: Asset[] | ImageProps[] | undefined
}

export interface KYC_TERMS {
  allTerms: boolean
  isPerson: boolean
  isUnique: boolean
  isService: boolean
}

export interface KYC_INFO {
  acctAuthStatus?: string
  kycLevel: number
  kyctRqstSttsCode: string
  mebrMgmtNmbr: string // 회원 번호
  authCertYn: string
  authDeniedReason: string // 반려사유
  residenceDeniedReason: string
  natnCode: string
  smsCode: string
  userLstnm: string // 성
  userFstnm: string // 이름
  birthDay: string // 생년월일
  clpnNmbr: string
  ctfcNmbr: string
  smsCtfcYn: string // 인증코드확인 여부 (Y/N)
  gender: string
  authIdImg: ImageProps[] // 외국인 신분증 이미지 AUTH_ID_IMG_MGMT_NMBR
  authIdImgMgmtNmbr: string
  authFaceImg: ImageProps[] // 외국인 얼굴 이미지
  authFaceImgMgmtNmbr: string // 외국인 얼굴 이미지
  btnUploadIdcardImg: ImageProps[] // 외국인 주거지인증 이미지 // RESIDENCE_ID_IMG_MGMT_NMBR
  btnUploadIdcard: string // 외국인 주거지인증 이미지 // RESIDENCE_ID_IMG_MGMT_NMBR
  btnUploadFaceImg: ImageProps[] // 외국인 주거지인증 얼굴 이미지
  btnUploadFace: string // 외국인 주거지인증 얼굴 이미지
  privacyAgree: boolean
  privacyAgreeYn: string // 개인정보 수집 이용동의
  bltbFiles: ImageProps[] // 이미지 목록
  bltbThnl: string // 썸네일이미지(등록후)

  reciAddress1: string // 우편번호
  reciAddress2: string // 주소 / postTown
  reciAddress3: string // 상세주소1
  reciAddress4: string // 상세주소2

  kycModdatetime: string // KYC 최근 작성일

  //  kyctRqstSttsCode!: string

  //   // files: [],
  // privacyAgree: false,
  // privacyAgreeYn: 'N',
  // maskImgB64: '',
}

export interface KYC_LIMIT {
  kycLevel: number
  wonLimitDeposit: number
  wonLimitPerCount: number
  wonLimitPerDay: number
}

export interface KYC_AUTH {
  userFstnm?: string
  userLstnm?: string
  natnCode?: string
  clpnNmbr?: string
  gender?: string
  privacyAgreeYn?: string
  smsCtfcYn?: string
  birthDay?: string // 생일
  files?: ImageProps[]

  reciAddress1?: string
  reciAddress2?: string
  reciAddress3?: string
  reciAddress4?: string
}

// KYC 유저 상세 정보
export interface KYC_USER_INFO {
  engFirstName: string
  engLastName: string
  workCode: string
  trnsPrpsCode: string
  trnsPrpsContents?: string
  srcsIncmCode: string
  srcsIncmEtcNm?: string
  realOwnUser: string
}

export interface KYC_OCR {
  ocrFile?: ImageProps[] // 인증 사진
  ocrMaskFile?: string // 인증 사진
  maskImgB64?: string // 인증 사진
  ocrType?: number // 인증 타입 (1-주민, 2-운전, 3-여권)
  userName?: string
  birthDate?: string
  issueDate?: string // 발급일자
  juminNo?: string // 주민번호 앞자리
  juminNo1?: string // 주민번호 앞자리
  juminNo2?: string // 주민번호 뒷자리
  driverNo?: string // 운전면허 번호
  passportNo?: string // 여권번호
  address?: string // 주소
  nationality?: string // 국가
  expiryDate?: string | number // 만료일자
  idType?: string
  idNum?: string
}

export interface KYC_BANK {
  bankCode: string | number
  fileMgmtNmbr?: string
  bankName?: string
  accountNum: string // 계좌번호
  printContent?: string // 인증코드
  isRemitt?: boolean // 송금여부
}

export interface CODE {
  grupCode: string
  grupCodeName: string
  codeName: string
  code: string
  msgCode: string
  useYn: string
}

export interface SELECT_ITEM {
  label: string
  value: string
}
