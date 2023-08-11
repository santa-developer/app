import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { toastDataState } from '@recoil/atoms/toast'
import _ from 'lodash'
import Toast from 'react-native-toast-message'
import { initToastData } from '@models/TOAST'

export default function ToastScreen(): JSX.Element {
  const [toastData, setToastData] = useRecoilState(toastDataState)
  const { title: text1, desc: text2, type } = toastData

  const onFinish = (): void => {
    setToastData(initToastData)
    Toast.hide()
  }

  useEffect(() => {
    if (_.some(text2)) {
      Toast.show({
        type: type || 'info',
        text1: text1 || '',
        text2: text2 || '',
      })

      setTimeout(() => {
        onFinish()
      }, 1500)
    }
  }, [text2])

  return <Toast position="bottom" />
}
