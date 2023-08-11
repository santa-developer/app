import { atom } from 'recoil'
import {
  UPLOAD_IMG,
  KYC_TERMS,
  KYC_INFO,
  KYC_BANK,
  KYC_USER_INFO,
  KYC_OCR,
} from '@models/KYC'

export const KYCReload = atom<boolean>({
  key: 'KYCReload',
  default: false,
})

export const KYCModal = atom<boolean>({
  key: 'KYCModal',
  default: false,
})

export const initKYCInfo = atom<KYC_INFO>({
  key: 'initKYCInfo',
  default: {
    acctAuthStatus: 'N',
    kycLevel: 0,
    kyctRqstSttsCode: '',
    mebrMgmtNmbr: '',
    authCertYn: '',
    authDeniedReason: '',
    residenceDeniedReason: '',
    natnCode: '', // 국가
    smsCode: '', // 국가번호
    userLstnm: '',
    userFstnm: '',
    birthDay: '',
    bltbThnl: '', // 썸네일이미지(등록후)
    bltbFiles: [],
    clpnNmbr: '', //휴대폰번호
    ctfcNmbr: '',
    smsCtfcYn: 'N',
    gender: '',
    authIdImg: [],
    authIdImgMgmtNmbr: '',
    authFaceImg: [],
    authFaceImgMgmtNmbr: '',
    btnUploadIdcard: '',
    btnUploadIdcardImg: [],
    btnUploadFace: '',
    btnUploadFaceImg: [],
    // files: [],
    privacyAgree: false,
    privacyAgreeYn: 'N',
    // maskImgB64: '',

    reciAddress1: '', //우편번호
    reciAddress2: '',
    reciAddress3: '', // 상세주소1
    reciAddress4: '', // 상세주소2

    kycModdatetime: '', // KYC 최근 작성일
  },
})

// 약관동의
export const KYCterms = atom<KYC_TERMS>({
  key: 'KYCterms',
  default: {
    allTerms: false,
    isPerson: false,
    isUnique: false,
    isService: false,
  },
})

// KYC 02 유저정보
export const KYC02UserInfo = atom<KYC_USER_INFO>({
  key: 'KYC02UserInfo',
  default: {
    engFirstName: '',
    engLastName: '',
    workCode: '',
    trnsPrpsCode: '',
    trnsPrpsContents: '',
    srcsIncmCode: '',
    srcsIncmEtcNm: '',
    realOwnUser: '',
  },
})

// KYC 03 신분증 인증
export const initKycOcr = atom<KYC_OCR>({
  key: 'initKycOcr',
  default: {
    ocrFile: [], // OCR 이미지
    ocrMaskFile: '', // 마스크 된 OCR 이미지
    ocrType: 0, // OCR 타입 => 1. 주민등록증, 2.운전면허증, 3. 여권
    userName: '', // 사용자명
    birthDate: '', // 생일
    issueDate: '', // 발급일자
    juminNo1: '', // 주민번호 앞자리
    juminNo2: '', // 주민번호 뒷자리
    driverNo: '', // 면허번호
    passportNo: '', // 여권번호
    address: '', // 주소
    expiryDate: '', // 여권만료일
  },
})

// 은행(bank)
export const KYCBank = atom<KYC_BANK>({
  key: 'KYCBank',
  default: {
    bankCode: '',
    fileMgmtNmbr: '',
    bankName: '',
    accountNum: '',
    printContent: '',
    isRemitt: false,
  },
})

export const KYCBankList = atom<KYC_BANK[]>({
  key: 'KYCBankList',
  default: [],
})

// 이미지 업로드
export const uploadImg = atom<UPLOAD_IMG>({
  key: 'uploadImg',
  default: {
    uploadIDcardImg: [],
    uploadFaceImg: [],
    uploadPORImg: [],
    uploadPORFaceImg: [],
  },
})

// 내국인/외국인 여부
export const nationState = atom({
  key: 'nationState', // 내국인임을 default로 함
  default: true,
})
