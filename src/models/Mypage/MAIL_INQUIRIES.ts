import { ImageProps } from '@models/Upload/PHOTO'

export interface MailInquiriesProps {
  questionFiles: ImageProps[]
  userEmail: string
  contents: string
  deviceType: string
  appVersion: string
}

export const initMailInquiries = {
  questionFiles: [],
  userEmail: '',
  contents: '',
  deviceType: '',
  appVersion: '',
}
