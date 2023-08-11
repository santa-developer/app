// 임의값 생성 (num: 자리수)
const randomString = (num: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  const charatersLength = characters.length
  for (let i = 0; i < num; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * charatersLength)
    )
  }
  return result
}

export default randomString
