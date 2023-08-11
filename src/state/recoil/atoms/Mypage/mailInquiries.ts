import {
  MailInquiriesProps,
  initMailInquiries,
} from '@models/Mypage/MAIL_INQUIRIES'
import { atom } from 'recoil'

// 마이페이지 메일 문의
export const MailInquiriesState = atom<MailInquiriesProps>({
  key: 'mailInquiries',
  default: initMailInquiries,
})
