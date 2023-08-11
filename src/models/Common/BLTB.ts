// import ATCM from './ATCM'
// import BLTB_COMT from './BLTB_COMT'
// import ATCM_SNS from './ATCM_SNS'

// import { ImageProps } from '@service/CameraService'
import EX_CREATOR_MODIFIER from '@models/EX_CREATOR_MODIFIER'
import ATCM from './ATCM'
import BLTB_COMT from './BLTB_COMT'

export type BltbUrlType =
  | 'Y'
  | 'I'
  | 'F'
  | 'T'
  | 'L'
  | 'NB'
  | 'NP'
  | ECommerceBltbUrlType

export type ECommerceBltbUrlType = 'ENS' | 'EA' | 'EC'

// 게시판
export default class BLTB extends EX_CREATOR_MODIFIER {
  public postMgmtNmbr!: string // 게시물 관리 번호
  public postDvsnCode!: string // 게시물 구분 코드 (M:미디어, C:커뮤니티, E: E-Commerce)

  public hispName!: string // 글이 작성된 스페이스 이름 - Not in DB
  public hispMgmtNmbr!: string // 하이스페이스 관리 번호
  public logoFileMgmtNmbr!: string // 하이스페이스 로고파일 관리번호

  public bltbSbjt!: string // 게시판 제목
  public bltbCott!: string // 게시판 본문
  public bltbUrl!: string // 게시판 URL
  public bltbThnl!: string // 게시판 미리보기이미지
  public urlType!: BltbUrlType // URL TYPE
  public delYn!: string // 삭제 여부
  public viewCnt = 0 // 조회수
  public deluserid!: string // 삭제자
  public delda!: string // 삭제일시
  public youtubeId!: string // 유튜브Id
  public bltbOpYn!: string // 게시판 공개 여부
  public tagCott!: string // 태그 내용
  public likeCnt = 0 // 좋아요 횟수
  public recCnt = 0 // 추천(보팅) 횟수
  public decCnt = 0 // 신고 횟수
  public comtCnt = 0 // 댓글 횟수
  public delResn!: string // 삭제 사유
  public bltbAtcmType!: 'F' | 'C' // F-직접등록,C-큐레이션

  public myLikeCnt = 0 // 좋아요 상태 : 1, 원상태 : 0 - Not in DB
  public myHateCnt = 0 // 싫어요 상태 : 1, 원상태 : 0 - Not in DB

  public myRecCnt = 0 // 해당 게시글의 추천(보팅) 상태 : 1, 원상태 : 0 - Not in DB
  public myMebrFlwCnt = 0 // 맴버 팔로잉 여부

  public fileMgmtNmbrList!: string[] // 파일 관리 번호 목록 - Not in DB
  //   public fileList!: ATCM[] // 파일 목록 - Not in DB

  public comtMgmtNmbrList!: string[] // 댓글 관리 번호 목록 - Not in DB
  public recentComtList!: BLTB_COMT[] // 댓글 목록 - Not in DB

  public bltbType!: string // P-개인,S-스페이스 - Not in DB (커뮤니티는 스페이스만)
  public tagNameList!: string[] // 해시태그 리스트 - Not in DB
  //   public bltbFiles!: ImageProps[] // 파일 목록 - Not in DB

  public userId!: string // 작성자 login id - Not in DB
  public mebrFileMgmtNmbr!: string // 작성자 사진 - Not in DB
  public mebrMgmtNmbr!: string // 작성자 mebrMgmtNmbr - Not in DB

  public bltbAtcmKind!: '00' | '01' | '02' | '03' // 게시물 타입 (00 - default, 01 - 이미지 1장, 02 - 여러장, 03 - 비디오) - Not in DB

  public followYn!: string // 팔로우 여부
  public bltbLang!: string // 언어 국가코드

  public hideYn!: string // 숨김 여부
  public hideBlocked!: boolean // 스페이스및 사용자에 의한 차단여부
  public atcmList!: ATCM[] // 직접등록 이미지 리스트
  public originDelYn!: 'Y' | 'N' // 원글 삭제(비공개) 여부
  public spaceOpYn!: 'Y' | 'N' // 스페이스 공개 여부
  public opYn!: 'Y' | 'N' // 스페이스 공개 여부 (spaceOpYn 이랑 동일)

  // E-Commerce
  public ecPrice!: string // 상품 가격
  public ecUnitCd!: string // 상품 가격 단위
  public ecUrl!: string // 상품 링크
  //NFT
  public nftId!: string // NFT ID
  public nftType!: string // NFT 경매, 정가
  public dDay!: string // 남은 일수
  public nftPrice!: number
  public payPrice!: number // 결제금액
  public payStatus!: string // NFT 결제 상태
  public tokenPrice!: number // HIBs토큰가격
  public nftPriceWon!: number // nft 가격을 원화로
  public imgNmbr!: string // 이미지
  public nftStatus!: string // nft 상태
  public nftSaleYn!: string // 판매여부
  public title!: string // NFT title
  public fileType!: string // video or Image
  public createYn!: string
  public nftImgWidth = 175
  public nftImgHeight = 175
  public reRegYn!: string
}
