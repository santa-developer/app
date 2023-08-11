/**
 * 이미지 관련 유틸
 */

import {
  ImageSourceProps,
  imageSizeType,
} from '@models/Common/IMAGES'
import _ from 'lodash'
import { Const, Images } from '@constants'

const dummyNoImageURI =
  'https://dummyimage.com/600x400/f5f5f5/3b86ff&text=No-Image'

function getImagePath(id: string, size: imageSizeType = 550): string {
  return id
    ? `${Const.IMAGE_URL}/common/imageProc?id=${id}&size=${size}`
    : dummyNoImageURI
}

/**
 * 이미지 사이즈를 조정하여 주소를 리턴 하는 함수
 * @param param0
 * @returns
 */
const getImageSource = ({
  id,
  type,
  size,
  originDelYn,
}: ImageSourceProps): { uri: string } | object => {
  let result
  if (id) {
    if (originDelYn === 'Y') {
      result = _.get(Images.png.noImage, type)
    } else {
      result = { uri: getImagePath(id, size) }
    }
  } else if (_.keys(Images.png.noImage).includes(type)) {
    result = _.get(Images.png.noImage, type)
  } else {
    result = Images.png.noImage
  }
  return result
}

export default { getImageSource }
