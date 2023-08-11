import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from '@constants'
import Text from '@components/Text'
import { getLocale } from 'i18n'
import { StyleSheet } from 'react-native'

function ServerChecking(): JSX.Element {
  const [locale, setLocale] = useState('US')

  useEffect(() => {
    getLocale().then(setLocale)
  }, [])

  return (
    <View style={styles.wrapper}>
      <View style={{ marginBottom: 20 }}>
        <Text bold="700" size={30} color={Colors.pu}>
          {locale === 'KR'
            ? '현재 서버 점검 중입니다.'
            : 'The Server is currently\nbeing checked.'}
        </Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text size={16}>
          {locale === 'KR'
            ? '점검 완료 후 앱 이용이 가능하며,'
            : 'You can use the app'}
        </Text>
        <Text size={16}>
          {locale === 'KR'
            ? '빠른 정상화를 위해 최선을 다하겠습니다.'
            : 'after the server check is complete.'}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ServerChecking
