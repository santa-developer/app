/**
 * 유효성 체크 관련 유틸
 */
export const VALIDATIONS = {
  userId: new RegExp('^[a-z_.0-9]{6,20}$'),
  password: new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+|<>?:{}])[A-Za-z0-9~!@#$%^&*()_+|<>?:{}]{8,20}$'
  ),
  email: new RegExp(
    '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[.][a-zA-Z]{2,3}$'
  ),
  hispName: new RegExp('^.{3,20}$'),
  hispId: new RegExp('^[a-z0-9]{3,20}$'),
  HIBS: new RegExp('^(\\d{1,20}\\.?\\d{0,2})$'),
  ecPrice: new RegExp('^\\d{1,20}\\.?\\d{0,2}$'),
  ecPriceKRW: new RegExp('^\\d{1,20}$'),
  checkText: new RegExp('^[가-힣a-zA-Z]+$'), // 한글 또는 영문만 사용
  checkEngText: new RegExp('^[a-zA-Z]+$'),
  checkNumText: new RegExp('^[0-9]+$'),
}
