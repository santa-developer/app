// Recoil selector
import { selector } from 'recoil'
import { StorageKey } from '@service/StorageService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isPlayableState, isWiFiEnabledState } from '../atoms/common'

export const isPlayableSelector = selector<boolean>({
  key: 'isPlayableSelector',
  get: async ({ get }) => {
    const isPlayable = get(isPlayableState)
    const isWiFiEnabled = get(isWiFiEnabledState)
    const value = await AsyncStorage.getItem(
      StorageKey.PLAY_ONLY_WIFI
    )

    return value && value === 'Y' ? isWiFiEnabled : isPlayable
  },
})
