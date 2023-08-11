import { atom } from 'recoil'

export const ActivityTagLocationState = atom<
  | 'like'
  | 'comment'
  | 'following'
  | 'tag'
  | 'wallet'
  | 'complain'
  | 'etc'
>({
  key: 'ActivityTagLocation',
  default: 'like',
})
