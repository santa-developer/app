import $t from 'i18n'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native'
import Header from '../components/Header'
import Privacy200716 from './History/Privacy200716'
import Privacy221205 from './History/Privacy221205'
import Privacy221228 from './History/Privacy221228'
import Privacy230228 from './History/Privacy230228'

const PrivacyComponent = ({
  setIsPrivacy,
}: {
  setIsPrivacy: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  const [version, setVersion] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollRef = useRef<any>()

  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: false,
    })
  }, [version])

  return (
    <SafeAreaView>
      <Header
        setIsModal={setIsPrivacy}
        // title={'개인정보처리방침'}
        title={$t('USER.USER_WORD_08')}
      />
      {version === 200716 ? (
        <Privacy200716 scrollViewRef={scrollRef} />
      ) : version === 221205 ? (
        <Privacy221205
          scrollViewRef={scrollRef}
          setVersion={setVersion}
        />
      ) : version === 221228 ? (
        <Privacy221228
          scrollViewRef={scrollRef}
          setVersion={setVersion}
        />
      ) : (
        <Privacy230228
          scrollViewRef={scrollRef}
          setVersion={setVersion}
        />
      )}
    </SafeAreaView>
  )
}

export default PrivacyComponent
