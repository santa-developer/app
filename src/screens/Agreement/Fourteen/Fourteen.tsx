import React from 'react'
import { SafeAreaView, View } from 'react-native'
import Header from '../components/Header'
import SubContents from '../components/SubContents'

const PrivacyComponent = ({
  setIsFourteen,
}: {
  setIsFourteen: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  // const webViewRef = useRef<WebView>(null)

  return (
    <SafeAreaView>
      <Header
        setIsModal={setIsFourteen}
        title="만 14세 이상 이용동의 안내"
      />
      <View style={{ paddingLeft: 15 }}>
        <SubContents
          numbering="·"
          contents="만 14세 미만은 회원가입 및 서비스 이용이 제한됩니다."
        />
      </View>
    </SafeAreaView>
  )
}

export default PrivacyComponent
