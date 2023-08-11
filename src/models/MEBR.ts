import EX_CREATOR_MODIFIER from './EX_CREATOR_MODIFIER'
// import HISP_CTGR from './HISP_CTGR'
// import { SocialType } from '@service/api/UserService'

// 회원
export default class MEBR extends EX_CREATOR_MODIFIER {
  public userFstnm!: string // 사용자 명
  public userId!: string // 사용자 ID
  public tempUserId!: boolean // 임시 사용자 ID 여부
  public modUserIdYn: 'Y' | 'N' = 'Y' // 사용자 ID 수정가능여부
  public userIdModdatetime!: number // 사용자 ID 수정일시
  public userEmil!: string // 사용자 이메일
  public pswd!: string // 비밀번호
  public mailCtfcYn!: string // 메일 인증 여부
  public smsCtfcYn!: string // SMS 인증 여부
  public clpnCtfcYn!: string // 휴대폰 인증 여부
  public clusAgrmYn!: string // 약관 동의 여부
  public clpnNmbr!: string // 휴대폰 번호
  public kyctRqstSttsCode!: string // KYC 신청 상태 코드
  public otpCtfcYn!: string // OTP 인증 여부
  public userNknm!: string // 사용자 별명
  public mebrSttsCode!: '10' | '40' | '60' // 회원 상태 코드. 10-정상 , 40-휴면 , 60-임시 비밀번호
  public stopDate!: string // 정지 일자
  public stopNmod!: string // 정지 일수
  public mailCtfcCode!: string // 메일 인증 코드
  public mebrDvsnCode!: string // 회원 구분 코드
  public natnCode!: string // 국가 코드
  public kyctCtfcReltFilename!: string // KYC 인증 실제 파일명
  public kyctCtfcCngeFilename!: string // KYC 인증 변경 파일명
  public kyctCtfcFileCurs!: string // KYC 인증 파일 경로
  public mebrJoinCursCode!: string // 회원 가입 경로 코드
  public kyctRejtResn!: string // KYC 반려 사유
  public kyctCtfcMthd!: string // KYC 인증 방법
  public joinHispMgmtNmbr!: string // 가입 하이스페이스 관리 번호
  public rcmdId!: string // 추천인 아이디
  public rcmdDatetime!: number // 추천인 등록일
  public kyctFileMgmtNmbr!: string // KYC 파일 관리 번호
  public mebrFileMgmtNmbr!: string // 회원 파일 관리 번호
  public tmpPswd!: string // 임시 비밀번호
  public pswdEncCratCode!: string // 비밀번호 암호화 생성 코드
  public userInf!: string // 사용자 소개
  public webUrl!: string // 사이트
  // public myCnt!: '0' | '1' // 맞팔로우 여부 (마이페이지 팔로우 리스트에서 사용, 상대가 나를 팔로우 하고 있으면 1)

  public profileImgUrl!: string // 썸네일 경로 - Not in DB
  public bgImgUrl!: string // 배경이미지 경로 - Not in DB

  public voteCnt!: number // 보팅 갯수 - Not in DB (마이페이지 보팅한 사용자 목록)

  public myFlwCnt!: number // 마이페이지 회원리스트 팔로우여부 - Not in DB (마이페이지 보팅한 사용자 목록)

  public mebrBgFileMgmtNmbr!: string // 회원 배경 파일 관리 번호 (마이페이지)

  // public ctgrList: HISP_CTGR[] = [] // 관심 카테고리 리스트 - Not in DB

  // public socialType!: SocialType // 소셜계정 타입 (페이스북: F, 구글 : G, 카카오: K)
  public socialId!: string // 소셜계정 ID

  public socialYn!: 'Y' | 'N' // 소셜계정 여부

  public address!: string // 클레이튼 토큰 address

  public blockMebrMgmtNmbr!: string // 차단한 멤버 관리번호 - 차단 계정 관리 페이지ㄱ
  public blockYn!: string // 내가 차단한 상대인지 여부
  public blockYnYou!: string // 상대가 나를 차단했는지 여부 (타인 마이페이지)

  public myVoteBltbViewYn!: string
  public myNFTBltbViewYn!: string

  public birthDay!: string

  public delMemberYn!: 'Y' | 'N'

  //로그인 userInfo에 KYC레벨(kycLevel), 이메일인증여부(emailCtfcYn) 추가
  public kycLevel?: number // 내 KYC 레벨
  public acctAuthStatus?: string // KYC 2단계 인증여부 (useb)
  public otpStatus?: string // OTP 인증 여부
  public vrPasswordStatus!: boolean // VR 비밀번호 설정 여부
  public emailCtfcYn?: string // 이메일 인증여부
  public clpnChngYn?: string // 전화번호 변경 여부

  public limitAgeYn?: 'Y' | 'N' // 'Y' : 14세 미만으로 앱 사용 불가
  public limitPerCount?: number // HIBS 1회 한도
  public limitPerDay?: number // HIBS 1일 한도
  public accuAmount?: number // HIBS 24시간 송금 누적 금액

  public decItem?: string // 신고정보
  public decDate?: string // 제재날짜

  public extWltAdrs?: string // 외부 지갑 주소

  constructor(
    public mebrMgmtNmbr: string // 회원 관리 번호
  ) {
    super()
  }
}
