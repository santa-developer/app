export interface ApiPathProp {
  url: string
  needToken: boolean
}

const apiPath = {
  // 앱 업데이트 확인
  event: { url: '/user/event', needToken: false },
  log: {
    url: '/user/log',
    needToken: true,
  },
  // 버전확인
  version: {
    android: { url: '/user/version/android', needToken: false },
    ios: { url: '/user/version/ios', needToken: false },
  },
  // 이슈
  issue: {
    regProc: { url: '/user/issue/regProc', needToken: true }, // 오류 신고 (현재 사용 안함)
    mailProc: { url: '/user/question/save', needToken: true }, // 메일문의(현재 사용 중)
  },
  // 다국어
  msg: {
    listProc: { url: '/user/msg/listProc', needToken: false }, // 텍스트 목록
  },
  // 알림
  alam: {
    listProc: { url: '/user/alam/listProc', needToken: true }, // 활동 내역 (old)
  },
  // 공지사항 목록
  notice: {
    listProc: {
      url: '/user/notice/listProc',
      needToken: true,
    },
  },
  // faq 목록
  faq: {
    listProc: {
      url: '/user/faq/listProc',
      needToken: true,
    },
  },
  push: {
    // 활동내역 (new)
    listProc: { url: '/user/push/listProc', needToken: true },

    // 활동내역 안읽은 알림 조회
    alam: {
      url: '/user/push/alam',
      needToken: true,
    },

    /**
     * 회원 장치 토큰
     */
    deviceTokenList: {
      url: '/user/push/deviceTokenList',
      needToken: true,
    },
    sendMessage: {
      url: '/user/push/sendMessage',
      needToken: true,
    }, // 활동 내역 (new)
  },
  // 로그인
  login: {
    loginProc: { url: '/user/login/loginProc', needToken: false }, // 로그인
    loginProcWithPhone: {
      url: '/user/login/loginProcWithPhone',
      needToken: false,
    }, // SNS 로그인 인증번호 전송
    loginProcWithPhoneCheck: {
      url: '/user/login/loginProcWithPhoneCheck',
      needToken: false,
    }, // SNS 로그인 인증번호 검증
    loginProcWithAc: {
      url: '/user/login/loginProcWithAc',
      needToken: true,
    }, // access token 으로 로그인
    reCaptcha: {
      loginProcWithTK: {
        url: '/user/login/loginProcWithTK',
        needToken: false,
      }, // 로그인 (reCaptcha)
      loginProcWithPhoneAndTK: {
        url: '/user/login/loginProcWithPhoneAndTK',
        needToken: false,
      }, // SNS 로그인 인증번호 전송 (reCaptcha)
    },
    userInfoWakeUp: {
      url: '/user/login/userInfoWakeUp',
      needToken: true,
    }, // 휴면 계정 해제
  },
  code: {
    listProc: { url: '/user/code/listProc', needToken: true }, // 공통코드 목록
  },
  popup: {
    list: { url: '/user/popup/list', needToken: true }, // 공지팝업 정보 가져오기
  },
  share: {
    getLink: { url: '/user/share/getLink', needToken: true }, // 공유하기 숏컷링크 가져오기
  },
  //회원 API
  member: {
    idck: { url: '/user/member/idck', needToken: false }, // 아이디 중복체크
    snsMemberCk: {
      url: '/user/member/snsMemberCk',
      needToken: false,
    }, // SNS 계정 미등록 여부 조회
    natnproc: { url: '/user/member/natnproc', needToken: false }, // 국가 코드 목록
    emailck: {
      url: '/user/member/emailck',
      needToken: false,
    }, // 이메일 중복체크
    sendFindPassProc: {
      url: '/user/member/sendFindPassProc',
      needToken: false,
    }, // 비밀번호 재설정 - 인증번호 발송
    confirmFindPass: {
      url: '/user/member/confirmFindPass',
      needToken: false,
    }, // 비밀번호 재설정 - 인증번호 확인
    findPassChange: {
      url: '/user/member/findPassChange',
      needToken: false,
    }, // 비밀번호 재설정 - 인증번호 확인
    sendEmailCtfcNmbrProc: {
      signUp: {
        url: '/user/member/sendEmailCtfcNmbrProc',
        needToken: false,
      }, // 가입
      update: {
        url: '/user/member/sendEmailCtfcNmbrProc',
        needToken: true,
      }, // 로그인 후 업데이트
    }, // 이메일 인증 - 인증번호 발송

    checkEmailCtfcNmbr: {
      signUp: {
        url: '/user/member/checkEmailCtfcNmbr',
        needToken: false,
      }, // 가입
      update: {
        url: '/user/member/checkEmailCtfcNmbr',
        needToken: true,
      }, // 로그인 후 업데이트
    }, // 이메일 인증 - 인증번호 확인
    sendSmsProc: {
      url: '/user/member/sendSmsProc',
      needToken: false,
    }, // 인증번호 발송
    sendSmsRcTkProc: {
      url: '/user/member/sendSmsRcTkProc',
      needToken: false,
    }, // 인증번호 발송 (reCaptcha)
    sendSmsWalletPin: {
      url: '/user/member/sendSmsWalletPin',
      needToken: true,
    }, // 지갑 인증번호 발송
    checkSmsProc: {
      url: '/user/member/checkSmsProc',
      needToken: true,
    }, // 인증번호 검증
    checkSmsWalletPin: {
      url: '/user/member/checkSmsWalletPin',
      needToken: true,
    }, // 지갑 인증번호 검증
    searchIdEmilProc: {
      url: '/user/member/searchIdEmilProc',
      needToken: false,
    }, // 아이디 찾기 이메일
    sendPassEmailProc: {
      url: '/user/member/sendPassEmailProc',
      needToken: false,
    }, // 임시 비밀번호 발송 이메일
    joinproc: { url: '/user/member/joinproc', needToken: false }, // 회원 가입
    sendPassSmsProc: {
      url: '/user/member/sendPassSmsProc',
      needToken: false,
    }, //임시비밀번호 SMS 발송
    modPassProc: { url: '/user/member/modPassProc', needToken: true }, // 비밀번호 재전송
    recommendUser: {
      url: '/user/member/recommendUser',
      needToken: true,
    }, // 추천인 등록 (recIdProc 미사용)
    followProc: { url: '/user/member/followProc', needToken: true }, // 유저 팔로우
    rmFollowProc: {
      url: '/user/member/rmFollowProc',
      needToken: true,
    }, // 유저 팔로우 취소
    myFollowingList: {
      url: '/user/member/myFollowingList',
      needToken: true,
    }, // 내가 팔로잉 중인 유저
    regDevice: { url: '/user/member/regDevice', needToken: true }, // 기기정보 저장
    removeDevice: {
      url: '/user/member/removeDevice',
      needToken: true,
    }, // 기기정보 삭제
    myCtgrInfoProc: {
      url: '/user/member/myCtgrInfoProc',
      needToken: true,
    }, // 관심분야 목록
    connectSns: {
      url: '/user/member/connectSns',
      needToken: false,
    }, // SNS 계정 연동
    connectSnsByEmail: {
      url: '/user/member/connectSnsByEmail',
      needToken: false,
    }, // SNS 계정 연동 (이메일)
    connectApple: {
      url: '/user/member/connectApple',
      needToken: true,
    }, // APPLE 계정 연동
    blockProc: { url: '/user/member/blockProc', needToken: true }, // 사용자 차단
    blockRmProc: { url: '/user/member/blockRmProc', needToken: true }, // 사용자 차단 해제
    myVoteBltbViewYnProc: {
      url: '/user/member/myVoteBltbViewYnProc',
      needToken: true,
    }, // 나의 보팅 내역 공개 여부 수정
    updateMyBirthDay: {
      url: '/user/member/updateMyBirthDay',
      needToken: true,
    }, // 생년월일 업데이트
    getPushSettings: {
      url: '/user/member/getPushSettings',
      needToken: true,
    }, // 푸시 상세설정 조회
    updatePushSettings: {
      url: '/user/member/updatePushSettings',
      needToken: true,
    }, // 푸시 상세설정 갱신
    updateMarketingPushSettings: {
      url: '/user/member/updateMarketingPushSettings',
      needToken: true,
    }, // 푸시 상세설정 갱신 (마케팅 수신 동의)
    secession: {
      url: '/user/member/secession',
      needToken: true,
    }, // 회원 탈퇴
    checkMebrFollowYn: {
      url: '/user/member/checkMebrFollowYn',
      needToken: true,
    }, // 멤버 팔로우 여부
    myKycLevel: {
      url: '/user/member/myKycLevel',
      needToken: true,
    }, // 내 KYC 레벨
  },
  home: {
    homeFollowList: {
      url: '/user/habl/homeFollowList',
      needToken: true,
    },
    homePopularityList: {
      url: '/user/habl/homePopularityList',
      needToken: true,
    },

    // foryouList: { url: '/user/home/foryouListNew', needToken: true }, // For you List
    // followList: {
    //   url: '/user/home/followListNewAddQestV2',
    //   needToken: true,
    // }, // Follow List Board and Quest
    // followList: { url: '/user/home/followListNew', needToken: true }, // Follow List
    recSpaceList: { url: '/user/home/recSpaceList', needToken: true }, // 추천 스페이스 목록
    // recSpaceQestList: {
    //   url: '/user/home/recSpaceQestList',
    //   needToken: true,
    // }, // 진행중인 챌린지가있는 추천 스페이스 목록
    // foryouList: { url: '/user/home/foryouListNew', needToken: true }, // For you List
    // followList: { url: '/user/home/followListNew', needToken: true }, // Follow List
    // followListNewAddQest: {
    //   url: '/user/home/followListNewAddQest',
    //   needToken: true,
    // }, // Follow List Board and Quest
    // followListNewAddQestV2: {
    //   url: '/user/home/followListNewAddQestV2',
    //   needToken: true,
    // }, // Follow List Board and Quest
  },
  hisp: {
    ctgrList: { url: '/user/hisp/ctgrList', needToken: false }, // 카테고리 조회
    reglistProc: { url: '/user/hisp/reglistProc', needToken: true }, // 게시글등록시 스페이스 목록 조희
    hispProc: { url: '/user/hisp/reglistProc', needToken: true }, // 팔로우한 스페이스 목록
    createProc: { url: '/user/hisp/createProc', needToken: true }, // 스페이스 생성
    idCk: { url: '/user/hisp/idCk', needToken: true }, // 스페이스 id 중복 체크
    nameCk: { url: '/user/hisp/nameCk', needToken: true }, // 스페이스 이름 중복 체크
    updateHispaceInfo: {
      url: '/user/hisp/updateHispaceInfo',
      needToken: true,
    }, // 스페이스 정보 수정
    followProc: { url: '/user/hisp/followProc', needToken: true }, // 스페이스 팔로우
    rmFollowProc: { url: '/user/hisp/rmFollowProc', needToken: true }, // 스페이스 팔로우 취소
    followerListProc: {
      url: '/user/hisp/followerListProc',
      needToken: true,
    }, // 스페이스 팔로워 목록
    atvtInfoCntProc: {
      url: '/user/hisp/atvtInfoCntProc',
      needToken: true,
    }, // 스페이스 활동 내역
    vstrLogProc: { url: '/user/hisp/vstrLogProc', needToken: true }, // 스페이스 접속 로그 남기기
    setBltbProc: { url: '/user/hisp/setBltbProc', needToken: true }, // 스페이스 대표글 등록

    /**
     * 스페이스 정보
     */
    mainSpaceInfo: {
      url: '/user/hisp/homePopularityList',
      needToken: true,
    },
    // main_noticeList: {
    //   url: '/user/hisp/main/noticeList',
    //   needToken: true,
    // }, // 공지사항 등록일순 5개
    // main_hipUserList: {
    //   url: '/user/hisp/main/hipUserList',
    //   needToken: true,
    // }, // 스페이스 핵인싸 10명
    // main_hipMediaList: {
    //   url: '/user/hisp/main/hipMediaList',
    //   needToken: true,
    // }, // 미디어 보팅순으로 30개
    // main_hipMainQuestList: {
    //   url: '/user/hisp/main/hipMainQuestList',
    //   needToken: true,
    // }, // 참여율이 높은 챌린지
    // main_hispFollwList: {
    //   url: '/user/hisp/main/hispFollwList',
    //   needToken: true,
    // }, // 스페이스 팔로워 목록
    // media_hispMediaList: {
    //   url: '/user/hisp/media/hispMediaList',
    //   needToken: true,
    // }, // 미디어 목록
    // notice_topListProc: {
    //   url: '/user/notice/topListProc',
    //   needToken: true,
    // }, // 공지사항 상단목록
    // search_hispPostSearch: {
    //   url: '/user/hisp/search/hispPostSearch',
    //   needToken: true,
    // }, // 하이스페이스내 검색 - 게시글
    // search_hispQuestSearch: {
    //   url: '/user/hisp/search/hispQuestSearch',
    //   needToken: true,
    // }, // 하이스페이스내 검색 - 챌린지
    // search_hispUserSearch: {
    //   url: '/user/hisp/search/hispUserSearch',
    //   needToken: true,
    // }, // 하이스페이스내 검색 - 계정
    favorites: {
      url: '/user/hisp/favorites',
      needToken: true,
    }, // 즐겨찾기 등록 / 삭제
    hispHomeQestList: {
      url: '/user/hisp/getQestList',
      needToken: true,
    }, // 스페이스 홈 챌린지
    blockProc: { url: '/user/hisp/blockProc', needToken: true }, // 스페이스 차단
    blockRmProc: { url: '/user/hisp/blockRmProc', needToken: true }, // 스페이스 차단 해제
    flwgApplyList: {
      url: '/user/hisp/flwgApplyList',
      needToken: true,
    }, // 비공개 스페이스 팔로우 신청 목록
    flwgApply: {
      url: '/user/hisp/flwgApply',
      needToken: true,
    }, // 비공개 스페이스 신청 처리
  },
  homeSpace: {
    bannerListProc: {
      url: '/user/homeSpace/bannerListProc',
      needToken: true,
    }, // 상단 스페이스 배너 목록
    mySpaceListProc: {
      url: '/user/homeSpace/mySpaceListProc',
      needToken: true,
    }, // 나의 스페이스 목록
    toptenListProc: {
      url: '/user/homeSpace/toptenListProc',
      needToken: true,
    }, // 스페이스 TOP 10
    spaceListByCtgrProc: {
      url: '/user/homeSpace/spaceListByCtgrProc',
      needToken: true,
    }, // 카테고리 별 스페이스 목록
  },
  bltb: {
    comtListProc: {
      url: '/user/bltb/comtListProc',
      needToken: true,
    }, // 게시글 댓글목록
    atvtLikeProc: {
      url: '/user/bltb/atvtLikeProc',
      needToken: true,
    }, // like
    atvtHateProc: {
      url: '/user/bltb/atvtHateProc',
      needToken: true,
    }, // hate

    // checkSnsProc: { url: '/user/bltb/checkSnsProc', needToken: true }, // Sns url 유효성 체크 및 정보 조회
    // originBltb: { url: '/user/bltb/originBltb', needToken: true }, // 인스타그램 원글상태 갱신
    // regProc: { url: '/user/bltb/regProc', needToken: true }, // 게시글 등록
    // regProcWithRcToken: {
    //   url: '/user/bltb/regProcWithRcToken',
    //   needToken: true,
    // }, // 게시글 등록 (reCaptcha)
    // detailProc: { url: '/user/bltb/detailProc', needToken: true }, // 게시글 상세정보
    // detailAtcmProc: {
    //   url: '/user/bltb/detailAtcmProc',
    //   needToken: true,
    // }, // 게시글 상세정보 첨부파일
    // atvtLikeProc: { url: '/user/bltb/atvtLikeProc', needToken: true }, // 게시글 좋아요
    // bltbUpdateProc: {
    //   url: '/user/bltb/bltbUpdateProc', // 게시글 수정
    //   needToken: true,
    // },
    // bltbRemoveBltb: {
    //   url: '/user/bltb/removeBltb', // 게시글 삭제
    //   needToken: true,
    // },
    // atvtLikeComtProc: {
    //   url: '/user/bltb/atvtLikeComtProc', // 댓글 좋아요
    //   needToken: true,
    // },
    // regComtProc: { url: '/user/bltb/regComtProc', needToken: true }, // 댓글 등록
    // modComtProc: { url: '/user/bltb/modComtProc', needToken: true }, // 댓글 수정
    // reomoveComtProc: {
    //   url: '/user/bltb/reomoveComtProc',
    //   needToken: true,
    // }, // 댓글 삭제
    // atvtVoteProc: { url: '/user/bltb/atvtVoteProc', needToken: true }, // 게시글 투표
    // mediaVotingList: {
    //   url: '/user/bltb/mediaVotingList',
    //   needToken: true,
    // }, // 게시글별 보팅 한 사용자 목록
    // mediaLikeList: {
    //   url: '/user/bltb/mediaLikeList',
    //   needToken: true,
    // }, // 게시글별 좋아요 한 사용자 목록
    // hideProc: { url: '/user/bltb/hideProc', needToken: true }, // 게시글 숨김 토글
    // getInstagramInfo: {
    //   url: '/user/bltb/getSnsInfo',
    //   needToken: true,
    // }, //인스타 그램 정보 가져오기
  },
  homeQuest: {
    bannerProc: {
      url: '/user/homeQuest/bannerProc',
      needToken: true,
    }, // 인기챌린지 상단 배너 목록
    questListProc: {
      url: '/user/homeQuest/questListProc',
      needToken: true,
    }, // 인기 폭팔 챌린지 목록
    getAmountProc: {
      url: '/user/homeQuest/getAmountProc',
      needToken: true,
    }, // 챌린지 보상금액 범위 가져오기
  },
  challenge: {
    // 챌린지 홈
    homeChallengeList: {
      url: '/user/quest/challengeList',
      needToken: true,
    },
    // 챌린지 삭제 (블록체인 미등록)
    removeChallenge: {
      url: '/user/quest/removeChallenge',
      needToken: true,
    }, // 챌린지 수정 (블록체인 미등록)
    updateChallenge: {
      url: '/user/quest/updateChallenge',
      needToken: true,
    },
  },
  // quest: {
  //   hiQuest_hiQuestList: {
  //     url: '/user/quest/hiQuestList',
  //     needToken: true,
  //   }, // 챌린지 목록
  //   hiQuest_hiQuestDetail: {
  //     url: '/user/quest/hiQuestDetail',
  //     needToken: true,
  //   }, // 챌린지 상세보기
  //   hiQuest_insertHiquest: {
  //     url: '/user/quest/insertHiquest',
  //     needToken: true,
  //   }, // 챌린지 등록
  //   hiQuest_updateHiquest: {
  //     url: '/user/quest/updateHiquest',
  //     needToken: true,
  //   }, // 챌린지 수정
  //   hiQuest_deleteHiquest: {
  //     url: '/user/quest/deleteHiquest',
  //     needToken: true,
  //   }, // 챌린지 삭제
  //   hiQuest_hiquestPtcpImgList: {
  //     url: '/user/quest/hiquestPtcpImgList',
  //     needToken: true,
  //   }, // 챌린지 사진 목록
  //   hiQuest_hiquestComtList: {
  //     url: '/user/quest/hiquestComtList',
  //     needToken: true,
  //   }, // 챌린지 댓글참여 목록
  //   hiQuest_hiquestPtcpList: {
  //     url: '/user/quest/hiquestPtcpList',
  //     needToken: true,
  //   }, // 챌린지 SNS참여 목록
  //   hiQuest_insertUserHiquestPctpImg: {
  //     url: '/user/quest/insertUserHiquestPctpImg',
  //     needToken: true,
  //   }, // 챌린지 참여(사진) 등록
  //   hiQuest_insertUserHiquestComt: {
  //     url: '/user/quest/insertUserHiquestComt',
  //     needToken: true,
  //   }, // 챌린지 참여(댓글형) 등록
  //   hiQuest_insertUserHiquestPctp: {
  //     url: '/user/quest/insertUserHiquestPctp',
  //     needToken: true,
  //   }, // 챌린지 참여(SNS) 등록
  //   hiQuest_insertHiquestVote: {
  //     url: '/user/quest/insertHiquestVote',
  //     needToken: true,
  //   }, // 챌린지 댓글 추천
  //   hiQuest_hiQuestRankList: {
  //     url: '/user/quest/hiQuestRankList',
  //     needToken: true,
  //   }, // 챌린지 참여 순위 목록
  //   hiQuest_insertHiquestPtcpRank: {
  //     url: '/user/quest/insertQestRank',
  //     needToken: true,
  //   }, // 챌린지 참여 순위 등록
  //   hiQuest_getTokenAmount: {
  //     url: '/user/quest/amount',
  //     needToken: true,
  //   }, // 예치가능 토큰 조회
  //   // 챌린지 광고 참여
  //   insertUserHiquestAd: {
  //     url: '/user/quest/insertUserHiquestAd',
  //     needToken: true,
  //   },
  //   // 챌린지 광고 로그 저장
  //   insertUserHiquestAdLog: {
  //     url: '/user/quest/insertUserHiquestAdLog',
  //     needToken: true,
  //   },
  //   // 광고 챌린지 통계 정보
  //   getAdChallengeInfo: {
  //     url: '/user/quest/getAdChallengeInfo',
  //     needToken: true,
  //   },
  //   insertUserHiquestOx: {
  //     url: '/user/quest/insertUserHiquestOx',
  //     needToken: true,
  //   }, // 챌린지 참여(OX) 등록
  //   insertUserHiquestHibs: {
  //     url: '/user/quest/insertUserHiquestHibs',
  //     needToken: true,
  //   }, // 챌린지 참여(HIBS) 등록
  //   insertUserHiquestSurvey: {
  //     url: '/user/quest/insertUserHiquestSurvey',
  //     needToken: true,
  //   }, // 챌린지 참여(투표) 등록
  //   insertUserHiquestQuiz: {
  //     url: '/user/quest/insertUserHiquestQuiz',
  //     needToken: true,
  //   }, // 챌린지 참여(객관식) 등록
  // },
  mypage: {
    // 마이페이지 정보
    myInfoProc: { url: '/user/mypage/myInfoProc', needToken: true },
    // 사용자 쓴글 목록
    myBltbListProc: {
      url: '/user/mypage/myBltbListProc',
      needToken: true,
    },
    // 정보 수정
    updateMemberInfoProc: {
      url: '/user/mypage/updateMemberInfoProc',
      needToken: true,
    },
    // 멤버 이미지 수정 (프로필 , 배경)
    updateMemberImgProc: {
      url: '/user/mypage/updateMemberImgProc',
      needToken: true,
    },
    // 내 포인트 확인
    memberpoint: {
      url: '/user/mypage/memberpoint',
      needToken: true,
    },
    // 비밀번호 확인
    confirmPassProc: {
      url: '/user/mypage/cofirmPassProc',
      needToken: true,
    },
    // 비밀번호 수정
    updatePassProc: {
      url: '/user/mypage/updatePassProc',
      needToken: true,
    },
    //핸드폰 번호 수정 (Send)
    updateMemberClpnNmbrProcSend: {
      url: '/user/mypage/updateMemberClpnNmbrProc/send',
      needToken: true,
    },
    //핸드폰 번호 수정 (Check)
    updateMemberClpnNmbrProcCheck: {
      url: '/user/mypage/updateMemberClpnNmbrProc/check',
      needToken: true,
    },
    //금주 누적 포인트
    nowpoint: {
      url: '/user/mypage/nowpoint',
      needToken: true,
    },
    //금주 활동 게시물 목록 조회
    getAtvtRecivedList: {
      url: '/user/mypage/getAtvtRecivedList',
      needToken: true,
    },

    // 랭킹 목록 조회
    rankingProc: {
      url: '/user/ranking/rankingProc',
      needToken: true,
    },

    // 이전 API
    // myBltbListProc: {
    //   url: '/user/mypage/myBltbListProc',
    //   needToken: true,
    // }, // 내가 쓴글 목록
    // myComtListProc: {
    //   url: '/user/mypage/myComtListProc',
    //   needToken: true,
    // }, // 내가 쓴 댓글 목록
    // myVoteListProc: {
    //   url: '/user/mypage/myVoteListProc',
    //   needToken: true,
    // }, // 내가 보팅한 게시물 목록
    // myQuestListProc: {
    //   url: '/user/mypage/myQuestListProc',
    //   needToken: true,
    // }, // 내가 참여한 챌린지 목록
    // myWriteQuestListProc: {
    //   url: '/user/mypage/myWriteQuestListProc',
    //   needToken: true,
    // }, //내가 작성한 챌린지 목록
    // getMyPtcpSpaceList: {
    //   url: '/user/mypage/getMyPtcpSpaceList',
    //   needToken: true,
    // }, // 참여한 챌린지 스페이스 목록
    // myInfoProc: { url: '/user/mypage/myInfoProc', needToken: true }, // 마이페이지 정보
    // myVoteUserListProc: {
    //   url: '/user/mypage/myVoteUserListProc',
    //   needToken: true,
    // }, // 보팅한 사용자 목록
    // myFollowerListProc: {
    //   url: '/user/mypage/myFollowerListProc',
    //   needToken: true,
    // }, // 팔로워 사용자 목록
    // myFollowingListProc: {
    //   url: '/user/mypage/myFollowingListProc',
    //   needToken: true,
    // }, // 팔로잉 사용자 목록
    // updateMemberImgProc: {
    //   url: '/user/mypage/updateMemberImgProc',
    //   needToken: true,
    // }, // 멤버 이미지 수정 (프로필 , 배경)
    // getMyVoteProc: {
    //   url: '/user/mypage/getMyVoteProc',
    //   needToken: true,
    // }, // 보팅 정보
    // updateMemberInfoProc: {
    //   url: '/user/mypage/updateMemberInfoProc',
    //   needToken: true,
    // }, // 멤버 정보 수정
    // updateMemberCtgrProc: {
    //   url: '/user/mypage/updateMemberCtgrProc',
    //   needToken: true,
    // }, // 멤버 관심분야 수정
    // // updateMemberClpnNmbrProc_send: {
    // //   url: '/user/mypage/updateMemberClpnNmbrProc/send',
    // //   needToken: true,
    // // }, //핸드폰 번호 수정 (Send)
    // // updateMemberClpnNmbrProc_check: {
    // //   url: '/user/mypage/updateMemberClpnNmbrProc/check',
    // //   needToken: true,
    // // }, //핸드폰 번호 수정 (Check)
    // confirmPassProc: {
    //   url: '/user/mypage/cofirmPassProc',
    //   needToken: true,
    // }, // 비밀번호 확인
    // updatePassProc: {
    //   url: '/user/mypage/updatePassProc',
    //   needToken: true,
    // }, // 비밀번호 수정
    // memberpoint: {
    //   url: '/user/mypage/memberpoint',
    //   needToken: true,
    // }, // 점수확인
    // getUserInfoFromId: {
    //   url: '/user/mypage/getUserInfoFromId',
    //   needToken: true,
    // }, // 유저 관리번호 조회
    // blockMemberList: {
    //   url: '/user/mypage/blockMemberList',
    //   needToken: true,
    // }, // 차단 목록 (사용자)
    // blockSpaceList: {
    //   url: '/user/mypage/blockSpaceList',
    //   needToken: true,
    // }, // 차단 목록 (스페이스)
    // pushCntInfo: {
    //   url: '/user/mypage/pushCntInfo',
    //   needToken: true,
    // }, // 새 글 툴팁
    // weekMyRanking: {
    //   url: '/user/ranking/weekMyRanking',
    //   needToken: true,
    // }, // 주간활동 보상내역
    // weekMyStaking: {
    //   url: '/user/ranking/weekMyStaking',
    //   needToken: true,
    // }, // 스테이킹등급 산정 결과
    // myNFTListProc: {
    //   url: '/user/nft/getNftMyList',
    //   needToken: true,
    // }, // 내가 보팅한 게시물 목록
  },
  search: {
    defaultList: {
      url: '/user/search/defaultList',
      needToken: true,
    }, // 통합검색 기본 목록
    searchMainList: {
      url: '/user/search/searchMainList',
      needToken: true,
    }, // 카테고리별로 인기 게시글 20개씩
    searchRecomSpaceList: {
      url: '/user/search/searchRecomSpaceList',
      needToken: true,
    }, // 추천 스페이스 목록 (관리자가 추천한거 5개)
    searchSpaceAccList: {
      url: '/user/search/searchSpaceAccList',
      needToken: true,
    }, // 스페이스 최근 검색 목록(검색후 클릭해서 접근한 스페이스 20개)
    searchSpaceList: {
      url: '/user/search/searchSpaceList',
      needToken: true,
    }, // 스페이스 검색
    searchRecomMediaList: {
      url: '/user/search/searchRecomMediaList',
      needToken: true,
    }, // 추천 게시글 목록 (관리자가 추천한거 5개)
    searchMediaAccList: {
      url: '/user/search/searchMediaAccList',
      needToken: true,
    }, // 게시글 최근 검색 목록(검색후 클릭해서 접근한 스페이스 20개)
    searchMediaList: {
      url: '/user/search/searchMediaList',
      needToken: true,
    }, // 게시물 검색
    searchRecomQestList: {
      url: '/user/search/searchRecomQestList',
      needToken: true,
    }, // 추천 챌린지 목록 (추천 5개)
    searchQestAccList: {
      url: '/user/search/searchQestAccList',
      needToken: true,
    }, // 챌린지 최근 검색 목록(검색후 클릭해서 접근한 스페이스 20개)
    searchQestList: {
      url: '/user/search/searchQestList',
      needToken: true,
    }, // 챌린지 검색
    searchRecomMemberList: {
      url: '/user/search/searchRecomMemberList',
      needToken: true,
    }, // 추천 계정 목록 (추천 5개)
    searchMemberAccList: {
      url: '/user/search/searchMemberAccList',
      needToken: true,
    }, // 계정 최근 검색 목록(검색후 클릭해서 접근한 스페이스 20개)
    searchMemberList: {
      url: '/user/search/searchMemberList',
      needToken: true,
    }, // 계정 검색
    searchRecomCategoryList: {
      url: '/user/search/searchRecomCategoryList',
      needToken: true,
    }, // 추천 카테고리 목록 (추천 5개)
    searchCategoryAccList: {
      url: '/user/search/searchCategoryAccList',
      needToken: true,
    }, // 카테고리 최근 검색 목록(검색후 클릭해서 접근한 스페이스 20개)
    searchCategoryList: {
      url: '/user/search/searchCategoryList',
      needToken: true,
    }, // 카테고리 검색
    searchRecomTagList: {
      url: '/user/search/searchRecomTagList',
      needToken: true,
    }, // 추천 태그 목록 (추천 5개)
    searchTagAccList: {
      url: '/user/search/searchTagAccList',
      needToken: true,
    }, // 태그 최근 검색 목록(검색후 클릭해서 접근한 스페이스 20개)
    searchTagList: {
      url: '/user/search/searchTagList',
      needToken: true,
    }, // 태그 검색
    deleteSearchCntnHist: {
      url: '/user/search/deleteSearchCntnHist',
      needToken: true,
    }, // 검색기록 삭제
    searchCtgrMediaList: {
      url: '/user/search/searchCtgrMediaList',
      needToken: true,
    }, // 태그, 카테고리 검색 컨텐츠 목록
    insertSchAccHist: {
      url: '/user/search/insertSchAccHist',
      needToken: true,
    }, // 최근검색 히스토리 저장
  },
  dec: {
    // 신고페이지
    hunter: {
      url: '/user/dec/hunter',
      needToken: true,
    }, //주간 헌터 여부
    list: {
      url: '/user/dec/list',
      needToken: true,
    }, //신고 내역
    bltbDecProc: { url: '/user/bltb/decProc', needToken: true }, // 게시문신고
    comtDecProc: { url: '/user/dec/saveDecComt', needToken: true }, // 댓글신고
    userDecProc: { url: '/user/dec/saveDecUser', needToken: true }, // 유저신고
    userDecInfo: {
      url: '/user/member/getDecUserInfo',
      needToken: true,
    }, // 유저 신고 코드
  },
  wallet: {
    asset: { url: '/wallet/asset', needToken: true },
    staking: { url: '/wallet/staking', needToken: true },
    getFavList: { url: '/user/wallet/getFavList', needToken: true }, // 지갑 즐겨찾기 목록
    myFollowingListWallet: {
      url: '/user/mypage/myFollowingListWalletProc',
      needToken: true,
    }, // 지갑 팔로잉 사용자 목록
    getReecntList: {
      url: '/user/wallet/getReecntList',
      needToken: true,
    }, // 최근 송금목록
    updateRecentFav: {
      url: '/user/wallet/updateRecentFav',
      needToken: true,
    }, // 최근 송금목록 즐겨찾기
    hiQuestDetailWallet: {
      url: '/user/quest/hiQuestDetailWallet',
      needToken: true,
    }, // 챌린지 상세보기
    nftDetailWallet: {
      url: '/user/wallet/nftDetailWallet',
      needToken: true,
    }, // NFT 상세보기
    stakingPeriodYn: {
      url: '/user/wallet/getStakingYn',
      needToken: true,
    },
    insertProduct: {
      url: '/user/wallet/payment/insertProduct',
      needToken: true,
    }, // 결제상품 등록
    updateQrcodeLink: {
      url: '/user/wallet/payment/updateQrcodeLink',
      needToken: true,
    }, // QRCODE link 등록
    getProduct: {
      url: '/user/wallet/payment/getProductDetail',
      needToken: true,
    }, // 결제상품 상세
    getProductList: {
      url: '/user/wallet/payment/getProductList',
      needToken: true,
    }, // 결제상품 목록
    insertOrder: {
      url: '/user/wallet/payment/insertPaymentOrder',
      needToken: true,
    }, // 주문 등록
    getOrderInfo: {
      url: '/user/wallet/payment/getOrderDetail',
      needToken: true,
    }, // 주문 상세
    getMyOrderInfo: {
      url: '/user/wallet/payment/getMyPaymentOrder',
      needToken: true,
    }, // 내주문 상세
    getOrderList: {
      url: '/user/wallet/payment/getOrderList',
      needToken: true,
    }, // 주문 목록
    getSalesList: {
      url: '/user/wallet/payment/getSalesList',
      needToken: true,
    }, // 주문 목록
    otpAuthentication: {
      url: '/user/member/checkOtpNumber',
      needToken: true,
    }, // OTP 인증 여부
    getVRPassword: {
      url: '/user/member/getVRCertKey',
      needToken: true,
    }, // VR 비밀번호 가져오기
    setVRPassword: {
      url: '/user/member/saveVRCertKey',
      needToken: true,
    }, // VR 비밀번호 설정하기
  },
  transaction: {
    getTransactionList: {
      url: '/user/wallet/getTransactionList',
      needToken: true,
    },
    txResult: {
      url: '/user/contract/getTransaction',
      needToken: true,
    },
    updateStatus: {
      url: '/user/wallet/updateTransactionStatus',
      needToken: true,
    },
    recentList: {
      url: '/user/wallet/getReecntList',
      needToken: true,
    },
    followingList: {
      url: '/user/mypage/myFollowingListWalletProc',
      needToken: true,
    },
  },
  shop: {
    getBannerList: {
      url: '/user/commerce/getCommerceBannerList',
      needToken: true,
    },
    getBestProductList: {
      url: '/user/commerce/getCommerceSuggProdList',
      needToken: true,
    },
    getShopList: {
      url: '/user/commerce/getCommerceList',
      needToken: true,
    },
    getCategoryList: {
      url: '/user/commerce/getCommerceCategoryList',
      needToken: true,
    },
    getShopDetail: {
      url: '/user/commerce/getCommerceDetail',
      needToken: true,
    },
    setBasketProduct: {
      url: '/user/commerce/saveFavoriteProduct',
      needToken: true,
    },
    setDeleteBasketProduct: {
      url: '/user/commerce/deleteFavoriteProduct',
      needToken: true,
    },
    setBuyBasketProduct: {
      url: '/user/commerce/saveCommerceFavoritePay',
      needToken: true,
    },
    setBuyProduct: {
      url: '/user/commerce/saveCommercePay',
      needToken: true,
    },
    getPaymentHistory: {
      url: '/user/commerce/getCommercePayDetail',
      needToken: true,
    },
    getBasketList: {
      url: '/user/commerce/getFavoriteList',
      needToken: true,
    },
    getCommercePayList: {
      url: '/user/commerce/getCommercePayList',
      needToken: true,
    },
    getCommercePayDetail: {
      url: '/user/commerce/getCommercePayDetail',
      needToken: true,
    },
    updateOrderPersonInfo: {
      url: '/user/commerce/updateOrderPersonInfo',
      needToken: true,
    },
    updateReciPersonInfo: {
      url: '/user/commerce/updateReciPersonInfo',
      needToken: true,
    },
    updateDeliveryInfo: {
      url: '/user/commerce/updateDeliveryInfo',
      needToken: true,
    },
    getWishList: {
      url: '/user/commerce/getWishProductList',
      needToken: true,
    },
    setWishProduct: {
      url: '/user/commerce/saveCommerceWishProduct',
      needToken: true,
    },
    setDeleteWishProduct: {
      url: '/user/commerce/deleteCommerceWishProduct',
      needToken: true,
    },
  },
  NFT: {
    index: {
      url: '/user/nft/getNftList',
      needToken: true,
    },
    getNftBannerList: {
      url: '/user/nft/getNftBannerList',
      needToken: true,
    },
    show: {
      url: '/user/bltb/detailProc',
      needToken: true,
    },
    historyList: {
      url: '/user/nft/getNftHistList',
      needToken: true,
    },
    saveNftPayment: {
      url: '/user/nft/saveNftPayment',
      needToken: true,
    },
    nftAuction: {
      url: '/user/nft/nftAuction',
      needToken: true,
    },
    getNftPayDetail: {
      url: '/user/nft/getNftPayDetail',
      needToken: true,
    },
    getNftMyList: {
      url: '/user/nft/getNftMyList',
      needToken: true,
    },
    deleteNftInfo: {
      url: '/user/nft/deleteNftInfo',
      needToken: true,
    },
    nftResales: {
      url: '/user/nft/nftReSales',
      needToken: true,
    },
    reRegNftAuction: {
      url: '/user/nft/reRegNftAuction',
      needToken: true,
    },
    deleteNftPayment: {
      url: '/user/nft/deleteNftPayment',
    },
  },
  kyc: {
    getKycHome: {
      url: '/user/kyc/home',
      needToken: true,
    },
    setKycInfo: {
      url: '/user/auth/self',
      needToken: true,
    },
    requestOcr: {
      url: '/user/kyc/requestOcr',
      needToken: true,
    },
    checkOcr: {
      url: '/user/kyc/checkOcr',
      needToken: true,
    },
    bankList: {
      url: '/user/kyc/bankList',
      needToken: true,
    },
    sendBank: {
      url: '/user/kyc/sendBank',
      needToken: true,
    },
    sendBankVerify: {
      url: '/user/kyc/sendBankVerify',
      needToken: true,
    },
    sendSmsProc: {
      url: '/userView/kyc/sendSmsProc',
      needToken: true,
    },
    checkSmsProc: {
      url: '/userView/kyc/checkSmsProc',
      needToken: true,
    },
    saveAuthRequestForeigner2: {
      url: '/user/kyc/saveAuthRequestForeigner2',
      needToken: true,
    },
    saveAuthRequestForeigner3: {
      url: '/user/kyc/saveAuthRequestForeigner3',
      needToken: true,
    },
    saveResidenceRequest: {
      url: '/user/kyc/saveResidenceRequest',
      needToken: true,
    },
    getIdCard: {
      url: '/user/kyc/getIdCard',
      needToken: true,
    },
    getIdCardBase64: {
      url: '/user/kyc/getIdCardBase64',
      needToken: true,
    },
    kycIdnttVrfct: {
      url: '/user/kyc/kycIdnttVrfct',
      needToken: true,
    },
    kycInfoReset: {
      url: '/user/kyc/kycInfoReset',
      needToken: true,
    },
  },
  otp: {
    getOTPInfo: {
      url: '/user/kyc/otp',
      needToken: true,
    },
    saveOtpKey: {
      url: '/user/kyc/saveOtpKey',
      needToken: true,
    },
    // saveOtpInitRequest: {
    //   url: '/user/kyc/saveOtpInitRequest',
    //   needToken: true,
    // },
    resetOtp: {
      url: '/user/kyc/resetOtp',
      needToken: true,
    },
  },
}

export default apiPath
