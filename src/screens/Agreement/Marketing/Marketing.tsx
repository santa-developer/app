import React from 'react'
import { SafeAreaView, View } from 'react-native'
import Header from '../components/Header'
import SubContents from '../components/SubContents'

const MarketingComponent = ({
  setIsMarketing,
}: {
  setIsMarketing: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  return (
    <SafeAreaView>
      <Header
        setIsModal={setIsMarketing}
        title="마케팅 정보 수신 동의"
      />
      <View
        style={{
          paddingLeft: 15,
        }}
      >
        <View style={{ marginBottom: 10 }}>
          <SubContents
            contents={`마케팅 정보 수신에 대한 동의를 거부할 권리가 있으며, 마케팅 정보 수신 항목에 동의하지 않아도 서비스 이용이 가능합니다.`}
          />
          <SubContents
            contents={`하블은 고객이 수집 및 이용에 동의한 아래의 개인정보를 활용하여 이메일 등 전자적 전송매체를 통해 광고·마케팅 목적의 각종 정보를 전송할 수 있습니다. 단, 광고성 정보 이외에 의무적으로 안내되어야 하는 정보는 수신동의 여부와 무관하게 제공됩니다.`}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents
            numbering="⓵"
            boldcontents="개인정보 수집·이용 목적"
            subContents={[
              {
                subNumbering: '·',
                subContents: '마케팅 및 광고 등에 활용',
              },
            ]}
          />
          <SubContents
            numbering="⓶"
            boldcontents="수집하는 개인정보 항목"
            subContents={[
              {
                subNumbering: '·',
                subContents: '이메일 주소',
              },
            ]}
          />
          <SubContents
            numbering="⓷"
            boldcontents="보유 및 이용기간"
            subContents={[
              {
                subNumbering: '·',
                subContents: '수신거부, 수신등의 철회시까지',
              },
              {
                subNumbering: '·',
                subContents:
                  '수신거부나 동의철회가 없을 경우 회원탈퇴시점 또는 법령에 따른 보유기간까지',
              },
            ]}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents contents="개인정보보호법 제22조 제4항에 따라 마케팅정보 수신에 동의하지 않아도 하블이 제공하는 서비스를 이용할 수 있습니다. 다만 동의 거부시 각종 소식 및 이벤트 참여에 제한이 있을 수 있습니다." />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents contents="본 수신동의를 철회하고자 할 경우 앱 내 마이페이지 > 설정 > 알림설정 또는 고객센터(1661-8101)를 통해 수신동의 철회 요청을 할 수 있습니다." />
        </View>
      </View>
    </SafeAreaView>
  )
}
export default MarketingComponent
