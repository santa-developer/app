import { ImageProps } from '@models/Upload/PHOTO'
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker'
import { Dev } from '@constants'

export async function getImageForm(): Promise<ImageProps> {
  const callBack = async (
    res: ImagePickerResponse,
    resolve: (value: ImageProps) => void
  ): Promise<void> => {
    // StatusBar.setBarStyle('dark-content', true)
    if (res.didCancel) {
      Dev.log('User cancelled image picker')
    } else if (res.errorCode) {
      Dev.log(
        `ImagePicker Error: [${res.errorCode}] ${res.errorMessage}`
      )
      // } else if (res.customButton)
      // Dev.log(`User tapped custom button: ${res.customButton}`)
    } else {
      if (res.assets) {
        const { fileName, width, height, type, uri } = res.assets[0]

        resolve({
          uri: uri || '',
          name: fileName || 'image.jpg',
          type: type || 'image/jpg',
          width: width,
          height: height,
        })
      }
    }
  }
  return new Promise((resolve) => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (res) => callBack(res, resolve)
    )
  })
}
