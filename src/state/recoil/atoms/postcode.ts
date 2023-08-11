import { atom } from 'recoil'
import { POST_CODE } from '@models/POST_CODE'

const initPostCode: POST_CODE = {
  reciAddress1: '',
  reciAddress2: '',
  reciAddress3: '',
  reciAddress4: '',
}

export const postCodeState = atom({
  key: 'postCodeState', // unique ID (with respect to other atoms/selectors)
  default: initPostCode, // default value (aka initial value)
})
