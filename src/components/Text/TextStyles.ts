import { Bold } from './TextModel'

export const StyledFontFamily = (bold?: Bold): string => {
  let fontFamily = 'SpoqaHanSansNeo-Regular'

  switch (bold) {
    case '100':
    case '200':
    case '250':
    case '300':
      fontFamily = 'SpoqaHanSansNeo-Light'
      break
    case '350':
    case '400':
    case 'normal':
      fontFamily = 'SpoqaHanSansNeo-Regular'
      break
    case '500':
      fontFamily = 'SpoqaHanSansNeo-Medium'
      break
    case '600':
    case '700':
    case '800':
    case '900':
    case 'bold':
      fontFamily = 'SpoqaHanSansNeo-Bold'
      break
  }
  return fontFamily
}
