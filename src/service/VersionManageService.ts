import VersionNumber from 'react-native-version-number'
import { Platform } from 'react-native'

// import { Dev } from '@constants'
// import VersionService from '@service/api/VersionService'
// import StorageService, { StorageKey } from '@service/StorageService'
// import { clearApplicationCache } from '@service/FileService'
import { codePushLabelState } from '../state/recoil/atoms/common'
import { useRecoilValue } from 'recoil'

const codepushLabel = (): string => {
  const label = useRecoilValue(codePushLabelState)
  return label
}

async function isLatestVersion(/*refer: 'app' | ''*/): Promise<boolean> {
  try {
    // const { appVersion, buildVersion } = VersionNumber
    if (Platform.OS === 'ios') {
      // const result = await VersionService.version.ios.get()
      // if (result.check) {
      //   const { newVersion, strictYn } = result.response
      //   if (refer === 'app' && strictYn !== 'Y') {
      //     return true
      //   }
      //   const current = appVersion.split('.')
      //   const newVer = newVersion.split('.')
      //   Dev.log('IOSapp Ver::' + appVersion + ',' + newVersion)
      //   if (current.length === newVer.length && current.length > 2) {
      //     for (let i = 0; i < current.length; i++) {
      //       const currVer = Number(current[i])
      //       const updateVer = Number(newVer[i])
      //       if (currVer == updateVer) {
      //         continue
      //       } else if (currVer > updateVer) {
      //         return true
      //       } else {
      //         return false
      //       }
      //     }
      //   } else {
      //     return true
      //   }
      // }
    } else {
      // const result = await VersionService.version.android.get()
      // if (result.check) {
      //   const { newVersion, strictYn } = result.response
      //   if (refer === 'app' && strictYn !== 'Y') {
      //     return true
      //   }
      //   Dev.log('android Ver::' + buildVersion + ',' + newVersion)
      //   return Number(buildVersion) >= Number(newVersion)
      // } else {
      //   return true
      // }
    }
  } catch (e) {
    return true
  }
  return true
}

async function currentAppVersion(): Promise<string> {
  return `${VersionNumber.appVersion}.${codepushLabel()}`
}

export default {
  isLatestVersion,
  currentAppVersion,
}
