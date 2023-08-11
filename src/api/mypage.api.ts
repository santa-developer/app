import apiPath from '@api/path'
import { axiosGet, axiosPost } from './manager'
import PAGINATION from '@models/Common/PAGINATION'
import RESPONSE from '@models/Common/RESPONSE'
import BLTB from '@models/Common/BLTB'
import MEBR from '@models/MEBR'
import { MyPageCntProps } from '@models/Common/MYPAGE_CNT'
import {
  UpdateProfileProps,
  // UpdateMemberImgProps,
} from '@models/Mypage/MYPAGE'
import homeSpace from './space.api'
import HISP_MGMT from '@models/Common/HISP_MGMT'
import HispKeyword from '@models/Common/HISP_KEYWORD'
import {
  WeeksStkgProps,
  WknbMgmtProps,
  RwdPoitProps,
  AtvPointProps,
} from '@models/Mypage/NOW_POINT'
import { AtvtBltbProps } from '@models/Mypage/ATVT_LIST'
import { ImageProps } from '@models/Upload/PHOTO'
import { RankingProps } from '@models/Mypage/RANKING'

const { mypage: mypagePath } = apiPath

const mypage = {
  // 사용자 정보 조회 API
  myInfoProc: {
    get: async (props: {
      params: {
        mebrMgmtNmbr: string
      }
      signal?: AbortSignal
    }): Promise<
      RESPONSE<{ userInfo: MEBR; cntInfo: MyPageCntProps }>
    > => {
      return axiosGet({
        path: mypagePath.myInfoProc,
        ...props,
      })
    },
  },
  // 사용자 게시물 정보 API
  myBltbListProc: {
    get: async (props: {
      params: {
        mebrMgmtNmbr: string
        currPage?: number
        recordCountPerPage?: number
      }
      signal?: AbortSignal
    }): Promise<
      RESPONSE<{ pagination: PAGINATION; list: BLTB[] }>
    > => {
      return axiosGet({
        path: mypagePath.myBltbListProc,
        ...props,
      })
    },
  },
  // 스페이스 정보 조회 API
  getMySpaceList: {
    get: async ({
      mebrMgmtNmbr,
    }: {
      mebrMgmtNmbr: string
      spaceLimit: number | null
    }): Promise<
      RESPONSE<{
        list: HISP_MGMT[]
        pagination: PAGINATION
        info?: HispKeyword
      }>
    > => {
      const result = await homeSpace.mySpaceListProc.get({
        params: { mebrMgmtNmbr },
      })
      return result
    },
  },
  //  멤버 정보  수정
  updateMemberInfoProc: {
    post: async ({
      params,
    }: {
      params: UpdateProfileProps
    }): // fileKeys: ['profileImg', 'bgImg']
    Promise<RESPONSE<{ mebrFileMgmtNmbr: string }>> => {
      return axiosPost({
        path: mypagePath.updateMemberInfoProc,
        params,
        // fileKeys,
      })
    },
  },
  // 멤버 프로필 이미지 수정
  updateMemberImgProc: {
    post: async (
      params: {
        imageType: 'P' | 'B'
        memberImg?: ImageProps
        initType?: string
      },
      fileKeys: string[]
    ): Promise<RESPONSE<{ mebrFileMgmtNmbr: string }>> => {
      return axiosPost({
        path: mypagePath.updateMemberImgProc,
        params: params,
        fileKeys,
      })
    },
  },

  // 비밀번호 확인
  confirmPassProc: {
    post: async ({
      params,
    }: {
      params: {
        userPassword: string
      }
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: mypagePath.confirmPassProc,
        params,
      })
    },
  },
  // 비밀번호 변경
  updatePassProc: {
    post: async ({
      params,
    }: {
      params: {
        password: string //비밀번호
        passwordRe: string //비밀번호 확인
      }
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: mypagePath.updatePassProc,
        params,
      })
    },
  },
  // 핸드폰번호 수정
  updateMemberClpnNmbrProcSend: {
    post: async ({
      nationIso2,
      clpnNmbr,
    }: {
      nationIso2: string
      clpnNmbr: string
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: mypagePath.updateMemberClpnNmbrProcSend,
        params: { nationIso2, clpnNmbr },
      })
    },
  },
  // 핸드폰번호 확인
  updateMemberClpnNmbrProcCheck: {
    post: async ({
      clpnNmbr,
      ctfcNmbr,
    }: {
      clpnNmbr: string
      ctfcNmbr: string
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: mypagePath.updateMemberClpnNmbrProcCheck,
        params: {
          clpnNmbr,
          ctfcNmbr,
        },
      })
    },
  },
  // 내 포인트 확인
  memberpoint: {
    get: async (params: {
      mebrMgmtNmbr: string
    }): Promise<RESPONSE<{ totalPoint: string }>> => {
      return axiosGet({
        path: mypagePath.memberpoint,
        params,
      })
    },
  },
  // 금주 누적 포인트
  nowpoint: {
    get: async (): Promise<
      RESPONSE<{
        stakingInfo: WeeksStkgProps
        nowData: WknbMgmtProps
        pointMaster: RwdPoitProps
        atvtPoint: AtvPointProps
        prevData: WknbMgmtProps
      }>
    > => {
      return axiosGet({
        path: mypagePath.nowpoint,
      })
    },
  },
  // 금주 활동 게시물 목록 조회
  getAtvtRecivedList: {
    get: async (props: {
      params: {
        currPage?: number
        blbtType?: string
      }
      // signal?: AbortSignal
    }): Promise<
      RESPONSE<{ pagination: PAGINATION; list: AtvtBltbProps[] }>
    > => {
      return axiosGet({
        path: mypagePath.getAtvtRecivedList,
        ...props,
      })
    },
  },
  //랭킹 목록 조회
  rankingProc: {
    get: async (params: {
      mebrMgmtNmbr: string
      wknbMgmtNmbr: string
      rankingType: string
    }): Promise<
      RESPONSE<{
        listTop3: RankingProps[]
        myRanking: RankingProps
        list: RankingProps[]
      }>
    > => {
      return axiosGet({
        path: mypagePath.rankingProc,
        params,
      })
    },
  },
}

export default mypage
