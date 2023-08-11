import AsyncStorage from '@react-native-async-storage/async-storage'
import { StorageKey } from '@service/StorageService'

class TokenService {
  getAccessToken = async (): Promise<string> => {
    return (await AsyncStorage.getItem(StorageKey.accessToken)) || ''
  }

  getRefreshToken = async (): Promise<string> => {
    return (await AsyncStorage.getItem(StorageKey.refreshToken)) || ''
  }
}

export default new TokenService()
