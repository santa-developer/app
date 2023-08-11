export default class RESPONSE<T = any> {
  constructor(
    public code: number, // 상태 코드
    public message: string, // 상태메세지
    public messageLocaleCode: string, // 상태메세지 언어코드
    public check: boolean = false, // 성공여부
    public response: T, // 응답데이터
    public decItem?: string,
    public decDate?: string
  ) {}
}
