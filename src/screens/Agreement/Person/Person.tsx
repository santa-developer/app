import React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
// import WebView from 'react-native-webview'
import { Layout } from '@constants'
import Header from '../components/Header'
import SubContents from '../components/SubContents'

const PersonComponent = ({
  setIsPerson,
}: {
  setIsPerson: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  // const webViewRef = useRef<WebView>(null)

  return (
    <SafeAreaView>
      <Header
        setIsModal={setIsPerson}
        title="개인정보 수집 및 이용 동의"
      />
      <ScrollView
        style={{
          paddingLeft: 15,
        }}
      >
        <SubContents contents="개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며, 동의 거부 시 'HABL' 서비스 이용이 제한됩니다." />

        <SubContents contents="하블은 이용자의 개인정보 보호를 위하여 최선을 다하고 있으며, 개인정보 보호 관련 법규를 준수하고 있습니다. 이용자의 동의를 통해 취득한 개인정보는 다음의 목적으로만 이용됩니다." />

        <View style={{ marginTop: 10 }}>
          <SubContents
            numbering="1."
            boldcontents="하블은 이용자의 회원가입 시점에 다음과 같은 개인정보를 수집합니다."
          />
        </View>

        <SubContents
          numbering="1)"
          boldcontents="수집목적"
          subContents={[
            {
              subContents:
                '회원가입 의사확인, 회원제 서비스 제공에 따른 본인식별, 회원 관리, 서비스 부정이용 방지',
            },
          ]}
        />

        <SubContents
          numbering="2)"
          boldcontents="수집·이용목적 및 개인정보 수집항목"
        />

        <SubContents
          numbering="⓵"
          boldcontents="회원가입"
          contents={`- 이메일 주소, 비밀번호, 생년월일, 계정 ID`}
        />
        <SubContents
          numbering="⓶"
          boldcontents="SNS 간편회원가입"
          contents={`카카오: 카카오계정(이메일), 프로필 정보(닉네임, 프로필 사진)(확인 후 파기)\n애플: 이메일, 이름(확인 후 파기)\n구글: 이메일, 이름(확인 후 파기)`}
        />

        <SubContents
          numbering="3)"
          boldcontents="보유 및 이용기간"
          subContents={[
            {
              subNumbering: '·',
              subContents:
                '회원 탈퇴 시까지 또는 법령에 따른 보유기간',
            },
            {
              subNumbering: '·',
              subContents:
                '부정이용으로 징계를 받기 전에 회원 가입 및 탈퇴를 반복하며 서비스를 부정 이용하는 사례를 막기 위해 탈퇴한 이용자의 아이디를 90일간 보관',
            },
          ]}
        />

        <View style={{ marginTop: 15 }}>
          <SubContents boldcontents="2. 서비스 이용과정에서 이용자로부터 수집하는 개인정보는 다음과 같습니다." />
          <SubContents
            numbering="1)"
            boldcontents="개인정보 수집·이용 목적"
            subContents={[
              { subContents: '이메일 문의, 불만사항의 처리' },
            ]}
          />
          <SubContents
            numbering="2)"
            boldcontents="개인정보 수집항목"
            subContents={[
              {
                subContents:
                  '이메일 주소, 기기정보, 하블APP 버전 정보, 문의내용에 포함된 개인정보',
              },
            ]}
          />
          {/* <SubContents
          numbering="⓵"
          boldcontents="디지털자산 지갑서비스 제공"
          subContents={[
            {
              subContents:
                '디지털자산 주소 등 암호화폐 전송에 관한 정보, 마지막 이용시간',
            },
          ]}
        /> */}

          <SubContents
            numbering="3)"
            boldcontents="보유 및 이용기간"
            subContents={[
              {
                subNumbering: '·',
                subContents:
                  '회원 탈퇴 시까지 또는 법령에 따른 보유기간',
              },
            ]}
          />
        </View>
        <View style={{ marginTop: 15 }}>
          <SubContents boldcontents="3. 이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있으나, 하블이 수집하는 최소한의 개인정보, 즉 필수 항목에 대한 수집 및 이용동의를 거부하실 경우 회원가입 또는 서비스 이용이 어려울 수 있습니다." />
        </View>

        <View style={{ marginBottom: Layout.headerHeight }}>
          <SubContents contents="더 자세한 내용에 대해서는 개인정보처리방침을 참고하시길 바랍니다." />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PersonComponent
