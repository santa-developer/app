export type imageSizeType = 200 | 450 | 500 | 550 | 300 | 880

/*
  게시글 직접등록, 큐레이션 썸네일 : 200,550,880
  하이퀘스트 썸네일 : 200,880
  하이스페이스 배너 썸네일 : 500,880
  하이스페이스 로고 : 200,300
  하이스페이스 썸네일 : 550
  사용자 배경 : 550
  사용자 프로필 : 200,550
  팝업 썸네일 : 880
*/

export type getImageType =
  | {
      type: 'feed'
      size: 200 | 500 | 550 | 880
    }
  | {
      type: 'feedProfile'
      size: 200 | 300
    }
  | {
      type: 'questThnl'
      size: 200 | 880
    }
  | {
      type: 'spaceBanner'
      size: 500 | 880
    }
  | {
      type: 'spaceLogo'
      size: 200 | 300
    }
  | {
      type: 'spaceThnl'
      size: 200 | 880
    }
  | {
      type: 'userBg'
      size: 550
    }
  | {
      type: 'user'
      size: 200 | 550
    }
  | {
      type: 'userSquare'
      size: 200 | 550
    }
  | {
      type: 'popupThnl'
      size: 200 | 550
    }
  | {
      type: 'NFT'
      size: 200 | 500 | 550 | 880
    }
  | {
      type: 'shop'
      size: 200 | 500 | 550 | 880
    }
  | {
      type: 'shopThnl'
      size: 450
    }

export type ImageSourceProps = {
  id?: string
  originDelYn?: 'Y' | 'N'
} & getImageType
