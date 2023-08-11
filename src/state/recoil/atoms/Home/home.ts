import { atom } from 'recoil'

export const isModalVisibleState = atom({
  key: 'isModalVisible',
  default: false,
})

export const isPageModelState = atom({
  key: 'isPageModel',
  default: false,
})

export const homeLocationState = atom({
  key: 'homeLocation',
  default: 'HABL',
})
