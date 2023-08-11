import apiPath from './path'
import { axiosGet, axiosPost } from './manager'
import RESPONSE from '@models/Common/RESPONSE'
import {
  CODE,
  KYC_AUTH,
  KYC_BANK,
  KYC_OCR,
  KYC_USER_INFO,
} from '@models/KYC'

const {
  member: memberAPIProc,
  kyc: kycAPIProc,
  code: codeAPIProc,
} = apiPath

const kyc = {
  // KYC 초기 화면 정보
  getKycHome: {
    get: async ({
      signal,
    }: {
      signal?: AbortSignal
    }): Promise<RESPONSE> => {
      return await axiosGet({
        path: kycAPIProc.getKycHome,
        signal,
      })
    },
  },
  // KYC 정보 설정
  setKYCInfo: {
    post: async ({
      params,
      signal,
    }: {
      params: KYC_AUTH
      signal: AbortSignal
    }): Promise<RESPONSE> => {
      return await axiosPost({
        path: kycAPIProc.setKycInfo,
        params,
        signal,
      })
    },
  },
  // KYC 정보 초기화
  kycInfoReset: {
    post: async ({
      signal,
    }: {
      signal?: AbortSignal
    }): Promise<RESPONSE> => {
      return await axiosPost({
        path: kycAPIProc.kycInfoReset,
        signal,
      })
    },
  },
  kycIdnttVrfct: {
    post: async ({
      params,
      signal,
    }: {
      params: KYC_USER_INFO
      signal?: AbortSignal
    }): Promise<RESPONSE> => {
      return await axiosPost({
        path: kycAPIProc.kycIdnttVrfct,
        params,
        signal,
      })
    },
  },
  // 신분증 이미지 업로드
  saveAuthRequestForeigner3: {
    post: async ({
      params,
      signal,
    }: {
      params: KYC_AUTH
      signal?: AbortSignal
    }): Promise<RESPONSE> => {
      return await axiosPost({
        path: kycAPIProc.saveAuthRequestForeigner3,
        fileKeys: ['files'],
        params,
        signal,
      })
    },
  },
  // 거주지 증명서 이미지 업로드
  saveResidenceRequest: {
    post: async ({
      params,
      signal,
    }: {
      params: KYC_AUTH
      signal?: AbortSignal
    }): Promise<RESPONSE> => {
      return await axiosPost({
        path: kycAPIProc.saveResidenceRequest,
        fileKeys: ['files'],
        params,
        signal,
      })
    },
  },
  // OCR 인증 요청
  requestOcr: {
    post: async ({
      params,
      signal,
    }: {
      params: KYC_OCR
      signal: AbortSignal
    }): Promise<RESPONSE> => {
      return await axiosPost({
        path: kycAPIProc.requestOcr,
        params,
        signal,
      })
    },
  },
  // OCR 확인
  checkOcr: {
    post: async ({
      params,
      signal,
    }: {
      params: KYC_OCR
      signal: AbortSignal
    }): Promise<RESPONSE> => {
      return await axiosPost({
        path: kycAPIProc.checkOcr,
        params,
        signal,
      })
    },
  },
  // 은행 목록
  bankList: {
    get: async (): Promise<RESPONSE> => {
      return await axiosGet({
        path: kycAPIProc.bankList,
      })
    },
  },
  sendBank: {
    post: async ({
      params,
      signal,
    }: {
      params: KYC_BANK | undefined
      signal: AbortSignal
    }): Promise<RESPONSE> => {
      return await axiosPost({
        path: kycAPIProc.sendBank,
        params,
        signal,
      })
    },
  },

  sendBankVerify: {
    post: async ({
      params,
      signal,
    }: {
      params: KYC_BANK
      signal: AbortSignal
    }): Promise<RESPONSE> => {
      return await axiosPost({
        path: kycAPIProc.sendBankVerify,
        params,
        signal,
      })
    },
  },

  // 인증번호 전송
  sendSmsProc: {
    post: async ({
      params: { clpnNmbr },
      signal,
    }: {
      params: { clpnNmbr: string }
      signal?: AbortSignal
    }): Promise<RESPONSE> => {
      return await axiosPost({
        path: kycAPIProc.sendSmsProc,
        params: { clpnNmbr },
        signal,
      })
    },
  },
  checkSmsProc: {
    post: async ({
      params: { clpnNmbr, ctfcNmbr },
      signal,
    }: {
      params: { clpnNmbr: string; ctfcNmbr: string }
      signal?: AbortSignal
    }): Promise<RESPONSE> => {
      return await axiosPost({
        path: kycAPIProc.checkSmsProc,
        params: { clpnNmbr, ctfcNmbr, smsType: 3 },
        signal,
      })
    },
  },
  saveAuthRequestForeigner2: {
    post: async ({
      params,
      signal,
    }: {
      params: KYC_AUTH
      signal?: AbortSignal
    }): Promise<RESPONSE> => {
      return await axiosPost({
        path: kycAPIProc.saveAuthRequestForeigner2,
        params,
        signal,
      })
    },
  },
  myKycLevel: {
    get: async ({
      signal,
    }: {
      signal?: AbortSignal
    }): Promise<RESPONSE> => {
      return await axiosGet({
        path: memberAPIProc.myKycLevel,
        signal,
      })
    },
  },
}

const code = {
  listProc: {
    get: async (
      params: { grupCode: string[] },
      signal?: AbortSignal
    ): Promise<RESPONSE<{ list: CODE[] }>> => {
      return axiosGet({
        path: codeAPIProc.listProc,
        params,
        signal,
      })
    },
  },
}
export { kyc, code }
