import HISP_MGMT from './HISP_MGMT'

export type SpaceListType = MySpaceListType | SpaceMultiListType

export type MySpaceListType = 'MY' | 'FOLLOW' | 'PRIVATE'

export type SpaceMultiListType = 'WEEK' | 'FORYOU' | 'REC' | 'KEYWORD'

export interface SpaceContentProps {
  hispace: HISP_MGMT
  followBtn?: {
    location: 'right' | 'bottom'
  }
  tbnlSize: number
}
