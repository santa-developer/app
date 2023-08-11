import EX_CREATOR_MODIFIER from '@models/EX_CREATOR_MODIFIER'

export enum PushType {
  VOTING = 'BD_REC', // 내글 보팅
  LIKE_BOARD = 'BD_LIKE', // 내 글 좋아요 누름
  LIKE_COMMENT = 'BD_COMT_LIKE', // 내 댓글 좋아요 누름
  WRITE_COMMENT = 'BD_COMT_REG', // 내 글에 댓글 닮
  WRITE_REPLY = 'BD_COMT_REPLY', // 내 댓글에 댓글 닮
  MEMBER_FOLLOW = 'MEBR_FLW', // 나 팔로우
  MEMBER_TAG = 'BD_ACCOUNT', // 사용자 태그
  MEMBER_COMMENT_TAG = 'COMT_ACCOUNT', // 사용자 댓글 태그

  SPACE_FOLLOW = 'HISP_FLW', // 내 스페이스 팔로우
  SPACE_FOLLOW_APPLY = 'HISP_FLW_APPLY', // 내 스페이스 팔로우 요청
  DELETE_BOARD = 'BD_DEL', // 운영자가 내글 삭제

  CHALLENGE_ANNOUNCE = 'BTCH_QEST_HISP_PTCP', //퀘스트 발표(개설자, 참여자한테 다 보냄)
  CHALLENGE_WINNER = 'BTCH_QEST_HISP_WNER', //퀘스트 당첨자(당첨자 한테만 보냄)
  CHALLENGE_WITHDRAW = 'BTCH_QEST_HISP_WDRW', //예치금 환불(참여자 없거나 부족할때)
  CHALLENGE_WINNER_SLET = 'BTCH_QEST_WNER_SLET', //당첨자선정 알림
  CHALLENGE_WINNER_RNDM = 'BTCH_QEST_RNDM_SLET', //당첨자 미선정으로인한 랜덤선정 알림

  MEMBER_ACTIVITY_REWARD = 'BTCH_MEBR_ATVT_REWD', //개인 활동 보상
  SPACE_ACTIVITY_REWARD = 'BTCH_SPCE_ATVT_REWD', //스페이스 활동 보상
  STAKING_REWARD = 'BTCH_STKG_REWD', //스테이킹 보상
  STAKING_CLASS = 'BTCH_STKG_CLAS', //스테이킹 등급 배치

  HUNTER_REWARD = 'REWARD_HUNTER', // 헌터 보상
  DECLARE_PASS = 'BD_DEC_PASS', // 신고 반려
  DECLARE_CONFIRM = 'BD_DEC_CONFIRM', // 신고 확정
  DECLARE_REPORTER = 'BD_DEC_REGUSERID', // 신고 글 작성자

  COMMERCE_REFUND = 'REFUND_COMMERCE', // 이커머스 교환,취소, 반품
  COMMERCE_DELIVERY = 'DELIVERY_COMMERCE', // 이커머스 배송중
  COMMERCE_FAIL = 'FAIL_COMMERCE', // 이커머스 교환,취소, 반품
  COMMERCE_DELIVERY_COPLITE = 'DELIVERY_COPLITE_COMMERCE', // 이커머스 배송완료
  COMMERCE = 'COMMERCE', // ??

  NFT_COMT_REG = 'NFT_COMT_REG', // NFT 댓글 등록시
  NFT_COMT_REPLY = 'NFT_COMT_REPLY', //NFT 댓글 답변시
  NFT_SELL = 'NFT_SELL', // NFT 판매됨
  NFT_CREATOR = 'NFT_CREATOR', //
  NFT_FAIL = 'NFT_FAIL', // 결제 실패 (예전것)
  NFT_WIN = 'NFT_WIN', // 입찰 성공
  NFT_REG_FAIL = 'NFT_REG_FAIL', // 등록 실패
  NFT_PAY_FAIL = 'NFT_PAY_FAIL', // 결제 실패
  NFT_BID_FAIL = 'NFT_BID_FAIL', // 경매 실패

  COMT_DEC_CONFIRM = 'COMT_DEC_CONFIRM', // 댓글 신고
  USER_DEC_CONFIRM = 'USER_DEC_CONFIRM', // 유저 신고
}

// PUSH
export default class PUSH extends EX_CREATOR_MODIFIER {
  // PUSH 관리번호
  public pushMgmtNmbr!: string

  // PUSH 타입
  public pushType!: PushType

  // 테이블 관리번호
  public tablMgmtNmbr!: string

  // 댓글남겼을때 내용 (:기준으로 나누져서 내용 달림)
  public pushMessage!: string

  // 보낸 사람 관리번호
  public smebrMgmtNmbr!: string

  // 보낸사람 사진 관리번호
  public sMebrFileMgmtNmbr!: string

  // 보낸사람 ID
  public sUserId!: string

  // 게시글 사진
  public bltbThnl!: string

  // 스페이스 로고
  public logoFileMgmtNmbr!: string

  // 스페이스 이름
  public hispName!: string

  // 스페이스 관리번호
  public hispMgmtNmbr!: string

  // 글 관리번호
  public postMgmtNmbr!: string

  // 퀘스트 제목
  public qestSbjt!: string

  // 퀘스트 썸네일
  public qestThnl!: string

  // 원글 삭제 여부
  public originDelYn!: 'Y' | 'N'

  // 팔로잉 여부
  public followYn!: string

  // NFT 제목
  public bltbSbjt!: string

  constructor() {
    super()
  }
}
