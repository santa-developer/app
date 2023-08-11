/**
 * 공통 유틸
 */

/**
 * 특정 글자수 초과 시 maxCharacters 수 뒤에 텍스트는 ... 으로 표기
 * @param text
 * @param maxCharacters
 * @returns
 */
export const truncatedText = (
  text: string,
  maxCharacters: number
): string => {
  const newText =
    text.length > maxCharacters
      ? text.slice(0, maxCharacters) + '...'
      : text
  return newText
}
