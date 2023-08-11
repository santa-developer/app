import { atom } from 'recoil'

export const spaceLocationState = atom({
  key: 'spaceLocation',
  default: 'recommend',
})

export const spaceSearchLocationState = atom<
  'space' | 'account' | 'spaceFeed' | 'hashtag'
>({
  key: 'spaceSearchLocation',
  default: 'space',
})

export const selectedSpaceCategoryInfo = atom<{
  title: string
  count: number
  categoryID: string
}>({
  key: 'selectedSpaceCategoryInfo',
  default: { title: '', count: 0, categoryID: '' },
})
