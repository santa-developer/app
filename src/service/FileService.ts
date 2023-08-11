import RNFS from 'react-native-fs'
import _ from 'lodash'

export const FilePath = {
  localeMsg: RNFS.DocumentDirectoryPath + '/msg.json',
}

export const writeFile = async (
  filepath: string,
  data: string
): Promise<void> => {
  if (await RNFS.exists(filepath)) {
    await RNFS.unlink(filepath)
  }
  return RNFS.writeFile(filepath, data, 'utf8')
}

export const setDefaultMsg = async (): Promise<void> => {
  if (!(await RNFS.exists(FilePath.localeMsg))) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require('../assets/message/msg.json')
    RNFS.writeFile(FilePath.localeMsg, JSON.stringify(data), 'utf8')
  }
}

export const clearApplicationCache = (dirPath: string): void => {
  if (!_.isEmpty(dirPath)) {
    RNFS.readDir(dirPath)
      .then((result) => {
        result.forEach((dirItem) => {
          if (dirItem.isFile()) {
            RNFS.unlink(dirPath + '/' + dirItem.name)
          } else if (dirItem.isDirectory()) {
            clearApplicationCache(dirItem.path)
          }
        })
      })
      .catch((err) => {
        if (__DEV__) {
          console.log(err.code, err.message) // eslint-disable-line
        }
      })
  } else {
    RNFS.readDir(RNFS.CachesDirectoryPath)
      .then((result) => {
        result.forEach((dirItem) => {
          if (dirItem.isFile()) {
            RNFS.unlink(RNFS.CachesDirectoryPath + '/' + dirItem.name)
          } else if (dirItem.isDirectory()) {
            clearApplicationCache(dirItem.path)
          }
        })
      })
      .catch((err) => {
        if (__DEV__) {
          console.log(err.code, err.message) // eslint-disable-line
        }
      })
  }
}
