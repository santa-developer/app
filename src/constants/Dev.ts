// @typescript-eslint/no-explicit-any
import { Alert, Platform } from 'react-native'
// import AuthStore from '@store/AuthStore'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const log = (...msg: any[]): void => {
  if (__DEV__) {
    console.log(...msg) // eslint-disable-line
  }
}

const alert = (props: { title: string; desc?: string }): void => {
  if (__DEV__) {
    const { title, desc } = props
    Alert.alert('[DEV] ' + title, desc)
  }
}

const jsonLog = (args: object): void => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(
      JSON.stringify(
        {
          OS: Platform.OS,
          // loginUser: AuthStore.loginedUserInfo?.userId,
          ...args,
        },
        null,
        4
      )
    )
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const error = (...msg: any[]): void => {
  if (__DEV__) {
    console.error(...msg) // eslint-disable-line
  }
}

export default {
  log,
  alert,
  error,
  jsonLog,
}
