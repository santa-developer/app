import AsyncStorage from '@react-native-async-storage/async-storage'

export const checkPassword = async (): Promise<boolean> => {
  const password = await AsyncStorage.getItem('password')
  return password ? true : false
}

export const createPassword = async (
  value: string
): Promise<string> => {
  await AsyncStorage.setItem('password', value)
  return 'success'
}

export const getPassword = async (): Promise<string> => {
  const password = await AsyncStorage.getItem('password')

  return password || ''
}
